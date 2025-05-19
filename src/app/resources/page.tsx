import { ResourceTable } from '../../components/resources/resource-table';
import { ResourceWrapper, ProcessingState, FHIRVersion } from '../../types/resource';

// Mock data for testing
const mockData: ResourceWrapper[] = [
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        createdTime: new Date().toISOString(),
        fetchTime: new Date().toISOString(),
        identifier: {
          key: 'test-key-1',
          uid: 'test-uid-1',
          patientId: 'test-patient-1',
        },
        resourceType: 'Patient',
        version: FHIRVersion.FHIR_VERSION_R4,
      },
      humanReadableStr: 'Sample patient data for John Doe. Age 45.',
      aiSummary: 'AI summary for patient data: Patient is male, 45 years old.',
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_PROCESSING,
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        identifier: {
          key: 'test-key-2',
          uid: 'test-uid-2',
          patientId: 'test-patient-1',
        },
        resourceType: 'Observation',
        version: FHIRVersion.FHIR_VERSION_R4,
      },
      humanReadableStr: 'Blood pressure reading: 120/80 mmHg.',
      aiSummary: undefined, // No AI summary yet
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_FAILED,
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 25 hours ago
        processedTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Processed 1 day ago
        identifier: {
          key: 'test-key-3',
          uid: 'test-uid-3',
          patientId: 'test-patient-2',
        },
        resourceType: 'MedicationOrder',
        version: FHIRVersion.FHIR_VERSION_R4,
      },
      humanReadableStr: 'Prescription for Amoxicillin.',
      aiSummary: 'Failed to process medication order details.',
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_NOT_STARTED,
        createdTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minute ago
        identifier: {
          key: 'test-key-4',
          uid: 'test-uid-4',
          patientId: 'test-patient-1',
        },
        resourceType: 'AllergyIntolerance',
        version: FHIRVersion.FHIR_VERSION_R4B,
      },
      humanReadableStr: 'Allergy to Penicillin.',
      aiSummary: undefined,
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        identifier: {
          key: 'test-key-5',
          uid: 'test-uid-5',
          patientId: 'test-patient-3',
        },
        resourceType: 'Procedure',
        version: FHIRVersion.FHIR_VERSION_R4,
      },
      humanReadableStr: 'Appendectomy performed on June 1st, 2023.',
      aiSummary: 'AI summary: Patient underwent an appendectomy.',
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_PROCESSING,
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        identifier: {
          key: 'test-key-6',
          uid: 'test-uid-6',
          patientId: 'test-patient-2',
        },
        resourceType: 'DiagnosticReport',
        version: FHIRVersion.FHIR_VERSION_R4B,
      },
      humanReadableStr: 'Lab results for blood panel. Hemoglobin levels are normal.',
      aiSummary: undefined,
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_COMPLETED,
        createdTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
        identifier: {
          key: 'test-key-7',
          uid: 'test-uid-7',
          patientId: 'test-patient-1',
        },
        resourceType: 'Immunization',
        version: FHIRVersion.FHIR_VERSION_R4,
      },
      humanReadableStr: 'Flu shot administered.',
      aiSummary: 'AI summary: Patient received flu shot.',
    },
  },
  {
    resource: {
      metadata: {
        state: ProcessingState.PROCESSING_STATE_FAILED,
        createdTime: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), // 50 hours ago
        fetchTime: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
        processedTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // Processed 30 minutes ago
        identifier: {
          key: 'test-key-8',
          uid: 'test-uid-8',
          patientId: 'test-patient-3',
        },
        resourceType: 'Condition',
        version: FHIRVersion.FHIR_VERSION_R4B,
      },
      humanReadableStr: 'Diagnosis of seasonal allergies.',
      aiSummary: 'Failed to process condition details.',
    },
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">EHR Resources</h1>
      <ResourceTable data={mockData} />
    </div>
  );
} 