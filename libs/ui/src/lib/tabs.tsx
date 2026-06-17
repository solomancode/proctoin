import { ReactNode, useMemo, useState } from "react";

interface Tab {
  label: string
  render: () => ReactNode
}

interface Props {
  tabs: Tab[]
  controls?: () => ReactNode
}

export const Tabs = (props: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const labels = useMemo(() => {
    return props.tabs.map((tab, i) => {
      return ( <button onClick={() => setActiveTabIndex(i)} className={
        'tab-label'
        + (activeTabIndex==i?' selected': '')
      } type="button" key={'label-' + tab.label}>{tab.label}</button>
      )
    })
  }, [props.tabs, activeTabIndex])

  const currentTabContent = useMemo(() => {
    return props.tabs[activeTabIndex].render()
  }, [props.tabs, activeTabIndex])

  return (
    <>
      <style jsx>
      {
        `
        .labels {
          background-color: color-mix(in srgb, var(--secondary-color), white 80%);
          display: flex;
          justify-content: space-between;
        }

        .tabs-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          flex-grow: 1;
        }

        .tabs-container :global(.tab-content) {
          display: none;
        }

        .tabs-container :global(.tab-label) {
          min-width: 16ch;
          text-align: start;
          padding: var(--base-padding);
          text-indent: var(--base-padding);
          background-color: color-mix(in srgb, var(--secondary-color), white 70%);
          height: 100%;
        }

        .tabs-container :global(.tab-label.selected) {
          color: var(--text-color-invert);
          background-color: var(--primary-color);
        }
        `
      }
    </style>
    <section className="tabs-container">
      <section className="labels">
      <nav>{labels}</nav>
      {props.controls?.()}
      </section>
        {currentTabContent}
    </section>
    </>
  )
}
