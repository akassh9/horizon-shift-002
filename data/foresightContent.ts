// data/foresightContent.ts

/** Describes the full set of texts & options for a single foresight category */
export interface ForesightContent {
    /** The opening terminal copy before listing scenario options */
    introText: string;
  
    /** Scenario list: file name (shown) + short description */
    options: Array<{
      file: string;
      description: string;
    }>;
  
    /** The long-form detail text for each scenario (aligned by index) */
    detailTexts: string[];
  
    /** Given a file name, generate the detail header block */
    detailHeaderTemplate: (file: string) => string;
  
    /** Configuration for each “How did this happen?” timeline flow */
    happenedConfig: Array<{
      header: string;       // e.g. “…AI Tutors: How did this happen?…”
      intro: string;        // timeline intro copy
      options: string[];    // theme names (hover targets)
    }>;
  }