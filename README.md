## Getting Started  

Open a terminal and run the following commands
```sh
npm install
nx run-many -t dev
```

### High Level Overview

```mermaid
graph TD

App[App - Proctoin]
Server[Server]
UI[UI]
Events[Events]
EM[Events Manager]

App --> UI
App --> Events
Server --> EM
```
###  Actors / User Stories
Candidate:  
- As a Candidate I want to start an exam session
- As a Candidate I want to answer a started exam question
- As a Candidate I want to end an exam session

Proctor: 
- As a Proctor I want to list suspicious sessions real-time
- As a Proctor I want to inspect a suspicious session events real-time
- As a Proctor I want to pause an exam session that require intervention
- As a Proctor I want to suspend an exam session 

### CandidateEvent

```mermaid 
classDiagram

class CandidateEventType {
        <<enumeration>>
        EXAM_START
        EXAM_PAUSED
        EXAM_STOPPED
        EXAM_TIMEOUT
        SUBMIT_ANSWER
        ACTIVITY_TAB_SWITCH
        ACTIVITY_COPY_PASTE
        ACTIVITY_SCREENSHOT
        ACTIVITY_CAMERA_SNAPSHOT
        ACTIVITY_AUDIO_RECORDING
    }
    
class CandidateEvent {
  + String candidate_id
  + String datetime
  + CandidateEventType event_type
  + CandidateEventPayload payload
}

class CandidateTabSwitchEventPayload {
  + String target_url
}    

class CandidateCopyPasteEventPayload {
  + String clipboard_contents
}    

class CandidateMediaEventPayload {
  + File file
  + String file_type
}
    
CandidateEventType -- CandidateEvent

```

### ProctorEvent

```mermaid 
classDiagram

class ProctorEventType {
        <<enumeration>>
        PAUSE_EXAM
        SUSPEND_EXAM
    }
    
class ProctorEvent {
  + String proctor_id
  + String datetime
  + ProctorEventType event_type
  + ProctorEventPayload payload
}

class ProctorPauseExamEventPayload {
  + String note
  + Number pause_duration
  + String candidate_id
}    

class ProctorSuspendExamPayload {
  + String reason
  + String candidate_id
}    
   
ProctorEventType -- ProctorEvent

```
### AnomalyDetectionEvent

```mermaid 
classDiagram

class AnomalyDetectionEventType {
        <<enumeration>>
        AUDIO_RECORDING_ANOMALY
        CAMERA_SNAPSHOT_ANOMALY
    }
    
class AnomalyDetectionEvent {
  + String datetime
  + AnomalyDetectionEventType event_type
  + AnomalyDetectionEventPayload payload
}

class AnomalyDetectionEventPayload {
  + String candidate_id
  + File file
  + String file_type
}    

```


```mermaid 

sequenceDiagram
       participant C as Candidate 
    participant API as API Gateway 
    

    C->>API: Start Exam Session
    alt Session has STARTED 
        API-->>C: resume started session
    else Session has ENDED or SUSPENDED 
        API-->>C: Return Error
    else
        API-->>C: Session Started
    end

```


```mermaid 

sequenceDiagram
    participant C as Candidate 
    participant API as API Gateway 
    participant P as Proctor 
    participant ES as Events Manager

    C->>API: CandidateEvent
    API->>ES: CandidateEvent
    ES->>P: CandidateEvent
    
    P->>API: ProctorEvent
    API->>ES: ProctorEvent
    ES->>C: ProctorEvent

```

### Areas of Improvement
1. Client Side
		1. Adding unit tests to core functionality
		2. Adding user friendly error messages
		3. Errors recovery and re-connects
		4. Adding missing critical UX interactions e.g. highlight selected candidate
		5. Replace global context with zustand
		6. Implement missing features
			1. Custom View Modes
			2. Candidates List Filtering and Fuzzy Search
			3. Graphs and Visualization
			4. Candidate Details Page
			5. Automation tab
			6. Logs Inspection tab
			7. Custom Proctor Event Messages
			8. Handle transient states properly

2. Server Side
	1. Adding unit tests
	2. Relay received events for events manager to process
	3. Integrate with anomaly detection service
	4. Emulate candidates interaction
	5. Use in memory DB for aggregated statistics fast access
	6. Use DBMS for persisting received events
	7. Offload more heavy lifting tasks to backend

3. General
	1. Better  Git commits
	2. Complete diagrams
  3. Clean unnecessary files
  4. Setup linting and formatting
  5. Better deployment


## AI Usage
- No code generation was used in developing this application. I have used AI for reasoning and validation.
