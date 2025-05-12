import { ResourceTable } from '@/components/ResourceTable/ResourceTable';
import { ResourceWrapper, ProcessingState, FHIRVersion } from '@/types/resource-types';

// Sample data for demonstration
const sampleData: ResourceWrapper[] = [
  {
    resource: {
      metadata: {
        resourceType: "Patient",
        createdTime: "2024-03-15T10:00:00Z",
        fetchTime: "2024-03-15T10:05:00Z",
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        identifier: {
          key: "pat1",
          uid: "123",
          patientId: "P001"
        },
        version: FHIRVersion.FHIR_VERSION_R4
      },
      humanReadableStr: "Patient John Doe, 45 years old, admitted for routine checkup.",
      aiSummary: "Middle-aged male patient presenting for annual physical examination."
    }
  },
  {
    resource: {
      metadata: {
        resourceType: "Observation",
        createdTime: "2024-03-15T11:00:00Z",
        fetchTime: "2024-03-15T11:10:00Z",
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        identifier: {
          key: "obs1",
          uid: "456",
          patientId: "P001"
        },
        version: FHIRVersion.FHIR_VERSION_R4
      },
      humanReadableStr: "Blood pressure reading: 120/80 mmHg. Temperature: 98.6°F.",
      aiSummary: "Normal vital signs recorded during routine checkup."
    }
  },
  {
    resource: {
      metadata: {
        resourceType: "Medication",
        createdTime: "2024-03-15T12:00:00Z",
        fetchTime: "2024-03-15T12:15:00Z",
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        identifier: {
          key: "med1",
          uid: "789",
          patientId: "P001"
        },
        version: FHIRVersion.FHIR_VERSION_R4
      },
      humanReadableStr: "Prescribed: Lisinopril 10mg daily for blood pressure management.",
      aiSummary: "Standard antihypertensive medication prescribed for blood pressure control."
    }
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      <ResourceTable data={sampleData} />
    </main>
  );
} 