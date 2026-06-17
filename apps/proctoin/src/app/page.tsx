'use client';
import {  useRef, useEffect, useState, createContext } from "react";
import { Aside, Donut, Candidate, StatusFilter, Tabs, Text, Icon, Layout, GlobalStyles } from "@proctoin/ui";
import { CandidateEvent } from "@proctoin/events";
import { GlobalState, INITIAL_GLOBAL_STATE } from "./context";
import { useWebSocket } from "./hooks/useWebSocket";
import { ProctorActions } from "./components/proctor-actions";

import dynamic from 'next/dynamic';

const VirtualList = dynamic(
  () => import('@proctoin/ui').then((mod) => mod.VirtualList),
  { ssr: false }
);

export default function Index() {
  const [globalState, setGlobalState] = useState(INITIAL_GLOBAL_STATE);
  const [[listWidth, listHeight], setListSize] = useState([300,300]);
  const ref = useRef<HTMLElement>(null);
  const { connect } = useWebSocket();
  const [selectedCandidate, setSelectedCandidate] = useState<number|null>(null);

  useEffect(() => {
    (async ()=>{
      try {
        console.log('pre')
        if (globalState.isConnected === false) {
         const ws = await connect(globalState.proctorId);
         console.log({ws})
         setGlobalState((pre) => ({ ...pre, isConnected: true }));
        }
      } catch (error) {
       setGlobalState((pre) => ({ ...pre, isConnected: false, ws: null, errors: [...pre.errors, error as string ] }));
      }
    })();
  }, [])

  useEffect(()=>{
    if (ref && ref.current) {
      setListSize([
        ref.current.clientWidth,
        ref.current.clientHeight
      ])
    }
  },[ref]);

  return (
    <GlobalState value={globalState}>
      <GlobalStyles>
        <Layout column gap grow>
          <Layout bgPrimary paddingInlineStart paddingInlineEnd spaceBetween>
            <Text text="Proctoin" invert/>
            <Text text={globalState.isConnected?'Connected':'Connecting...'} invert/>
          </Layout>
          <Layout gap paddingInlineStart paddingInlineEnd grow>
            <Layout column gap paddingInlineStart paddingInlineEnd>
              <Icon name="dashboard" />
              <Icon name="automation" desaturate />
              <Icon name="logs" desaturate />
            </Layout>
            <Tabs tabs={[{ label:'Incidents View', render: () => (
              <Layout column grow>
                <StatusFilter status="1000 Incident of 10000" />
                 <section ref={ref} className="grow">
                   <VirtualList itemHeight={52} width={listWidth} height={listHeight} renderItem={(item) =>
                   {
                     const name = "Candidate #" + item;
                     return <Candidate onSelect={() => setSelectedCandidate(item)} name={name} tags={[{name: 'tabswitch'}, {name: 'copypaste'}]} />
                   }
                 } list={Array.from({length: 10000}, (_, i) => i + 1)} />

                 </section>
              </Layout>
            )}, { label:'Custom View', render: () => 'TODO:'}]} controls={() => <Icon name="settings" />} />
            <Aside>
              {
                selectedCandidate
                ? <ProctorActions selectedCandidateId={'c'+selectedCandidate}/>
                : <Donut />
              }
            </Aside>
          </Layout>
        </Layout>
        </GlobalStyles>
    </GlobalState>
  )
}

