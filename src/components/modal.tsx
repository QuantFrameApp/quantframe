import { Component, JSX, onCleanup, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Close } from '.'

type Props = {
  open: boolean;
  children: JSX.Element;
  onClose?: () => void;
}
export const Modal: Component<Props> = (props) => {
  
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose?.()
    }
  }

  onMount(() => window.addEventListener('keydown', handleKeydown))
  onCleanup(() => window.removeEventListener('keydown', handleKeydown))
    
  return (
    <>
      {props.open && (
        <Portal>
          <div class="absolute top-0 w-screen h-screen bg-slate-900 select-none text-primary">
            <div>
              <div class="absolute top-0 right-0 mx-2 mt-1 flex flex-col items-center">
                {/* TODO layout */}
                <Close onClick={props.onClose} class="h-8 w-8" />
                <span class="text-sm">ESC</span>
              </div>
              {props.children}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}