import { Component } from 'solid-js'
import { HorizontalTabs, Section } from '../../components'

import WarframeMarket from './settingsWfm'
import App from './settingsApp'

export const Settings: Component<{}> = (props) => {
  return (
    <Section title="Settings">
      {/* <HorizontalTabs
        headers={[
          App.name,
          WarframeMarket.name,
        ]}
        sections={[
          <App.Component />,
          <WarframeMarket.Component />,
        ]}
      /> */}

      <App.Component />

    </Section>
  )
} 