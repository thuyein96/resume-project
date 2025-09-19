'use client';

import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { ResumeData } from '@/types/resume';
import { initialData } from '@/lib/initial-data';

// Define the shape of our context.
// This is what the components will have access to.
type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  isDirty: boolean;
};

// Create the context with a default value of null.
const ResumeContext = createContext<ResumeContextType | null>(null);


// Create a "Provider" component. This component will wrap parts of our app
// that need access to the resume data.
export function ResumeProvider({
  children,
  initialServerData = null,
}: {
  children: React.ReactNode;
  initialServerData?: ResumeData | null;
}) {
  // `useState` is a React Hook to hold the resume data.
  // `resumeData` is the current state.
  // `setResumeData` is the function to update it.
  const [resumeData, setResumeData] = useState<ResumeData>(initialServerData || initialData);
  
  // We keep a copy of the original data to check if any changes have been made.
  const [originalData, setOriginalData] = useState<ResumeData>(initialServerData || initialData);
  
  // `isDirty` will be true if `resumeData` is different from `originalData`.
  const [isDirty, setIsDirty] = useState(false);

  // This `useEffect` hook runs when the data from the server changes.
  // It updates our state with the new data.
  useEffect(() => {
    if (initialServerData) {
      setResumeData(initialServerData);
      setOriginalData(initialServerData);
      setIsDirty(false); // Reset dirty state since we just loaded fresh data
    }
  }, [initialServerData]);

  // This `useEffect` hook runs whenever `resumeData` or `originalData` changes.
  // It compares them to see if the user has made any edits.
  useEffect(() => {
    // We convert both objects to strings to easily compare them.
    const isDataDirty = JSON.stringify(resumeData) !== JSON.stringify(originalData);
    setIsDirty(isDataDirty);
  }, [resumeData, originalData]);

  // We package up the values we want to share with other components.
  const value = { resumeData, setResumeData, isDirty };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

// Create a custom hook `useResume` to easily access the context data.
// This avoids having to write `useContext(ResumeContext)` in every component.
export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    // If a component tries to use this hook without being inside a `ResumeProvider`,
    // we throw an error to let the developer know.
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
