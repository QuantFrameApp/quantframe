import { Component, For, createSignal, onMount } from 'solid-js'
import { Button, Input, Section } from '../components/core'
import { Wfm } from '../types'
import { itemCache } from '../lib/persistance'
import { Refresh } from '../components'
import clsx from 'clsx'
import wfmClient, { wfmThumbnail } from '../api/wfmClient'
import { throttle } from 'lodash'
import { Countdown } from '../components/countdown'


const PreviewImage: Component<{ src?: string }> = (props) => (
  <>
    {props.src && (
      <img src={wfmThumbnail(props.src)} alt="Item Preview" />
    )}
  </>
)

const ItemForm: Component<{
  onSubmit: (e: Event) => void,
  cache: Record<string, Wfm.Item>
}> = (props) => {
  let formRef: HTMLFormElement | undefined
  const [selected, setSelected] = createSignal<Wfm.Item>()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const { item, platinum, isMod, rank } = e.target as HTMLFormElement

    const [data, err] = await wfmClient.order.create({
      item: props.cache[item.value].id,
      platinum: +platinum.value,
      order_type: 'buy',
      quantity: 1,
      // TODO no way to know if its a mod or not atm
      rank: isMod.checked ? +rank.value : undefined,
      // sub_type: 'intact',
      visible: false, // FIXME remove this when release. I just don't wanna fuck my account up, too hard
    })
    if (data) {
      console.log(data)
    }
  }

  const [isMod, setIsMod] = createSignal(false)

  return (
    <form ref={formRef} onSubmit={handleSubmit} class="flex flex-col items-center w-52">
      <h2>Purchase new item:</h2>
      <div class="flex">
        <div id="inputs">
          <div class="p-2">
            <Input
              placeholder="Item Name"
              type="text"
              id="item"
              name="item"
              required
              autocomplete="on"
              list="wfm-items"
              onInput={(e) => {
                const input = e.currentTarget as HTMLInputElement
                const item = props.cache[input.value]
                setSelected(item)
              }}
            />
            <div class="group w-full">
              <Input type="checkbox" id="isMod" name="isMod" onInput={(e) => setIsMod(e.target.checked)} />
              <label for="isMod">
                Mod <div class="mx-2 text-sm text-gray-300 bg-gray-900">I currently don't have a list of what is or isn't a mod</div>
              </label>
              {isMod() && (
                <div>
                  <Input type="number" name="rank" placeholder="Mod Rank" value={0} max={10} min={0} />
                </div>
              )}
            </div>
            <datalist id="wfm-items">
              <For each={Object.keys(props.cache)}>
                {(item) => (
                  <option value={item} label={item} />
                )}
              </For>
            </datalist>
          </div>
          <div class="p-2">
            <Input
              placeholder="Price"
              type="number"
              id="platinum"
              name="platinum"
              required
            />
          </div>
        </div>
        <PreviewImage src={selected()?.thumb} />
      </div>
      <Button type="submit" class="px-4">Buy</Button>
    </form>
  )
}

const ItemTable: Component<{ items: Wfm.Item[] }> = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Avg Purchase Price</th>
          <th>Owned</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  )
}

export const Inventory = () => {
  const [cache, setCache] = createSignal<Record<string, Wfm.Item>>({})
  const [isRefreshing, setIsRefreshing] = createSignal(false)

  onMount(async () => {
    const cache = await itemCache.get()
    setCache(cache.items)
  })

  const [isThrottled, setIsThrottled] = createSignal(false)

  const handleRefresh = throttle(async () => {
    setIsRefreshing(true)
    const [items] = await wfmClient.items.list()
    if (items) {
      const current = cache()
      for (const item of items) {
        current[item.item_name] = item
      }
      await itemCache.update({ items: current })
    }
    setIsRefreshing(false)
    setIsThrottled(true)
  }, 10000)

  return (
    <Section title={(
      <span class="flex items-center">
        <h2 class="text-2xl">Inventory Manager</h2>
        <Refresh class={clsx('ml-2', isRefreshing() && 'animate-spin')} onClick={handleRefresh}/>
        {isThrottled() && (
          <Countdown time={{ minute: 30 }} onEnd={() => setIsThrottled(false)}/>
        )}
      </span>
    )}>
      <ItemForm cache={cache()} onSubmit={() => {}}/>
      <ItemTable items={[]} />
    </Section>
  )
}