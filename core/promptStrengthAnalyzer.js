export function promptStrengthAnalyzer(prompt) {
  const clarity = checkClarity(prompt);
  const specificity = checkSpecificity(prompt);
  const structure = checkStructure(prompt);
  const context = checkContext(prompt);
  
  // Calculate overall score (0-10)
  const scores = [clarity.score, specificity.score, structure.score, context.score];
  const overallScore = Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
  
  // Collect all good points
  const goodPoints = [
    ...clarity.positives,
    ...specificity.positives,
    ...structure.positives,
    ...context.positives
  ];
  
  // Collect all improvements
  const improvements = [
    ...clarity.suggestions,
    ...specificity.suggestions,
    ...structure.suggestions,
    ...context.suggestions
  ];
  
  // Collect all tips
  const tips = [
    ...clarity.tips,
    ...specificity.tips,
    ...structure.tips,
    ...context.tips
  ];
  
  return {
    overallScore,
    goodPoints,
    improvements,
    tips,
    breakdown: {
      clarity: clarity.score,
      specificity: specificity.score,
      structure: structure.score,
      context: context.score
    }
  };
}

// CLARITY CHECKER
function checkClarity(prompt) {
  let score = 5;
  const positives = [];
  const suggestions = [];
  const tips = [];
  
  // Check for vague words
  const vagueWords = ['something', 'anything', 'stuff', 'things', 'good', 'better', 'nice', 'some'];
  const foundVague = vagueWords.filter(word => 
    prompt.toLowerCase().includes(word)
  );
  
  if (foundVague.length === 0) {
    positives.push('Uses specific, concrete language');
    score += 2;
  } else {
    suggestions.push(`Avoid vague words: ${foundVague.join(', ')}`);
    tips.push('Replace "make something good" with "create a professional landing page with hero section"');
    score -= 1;
  }
  
  // Check for pronouns without clear antecedents
  const ambiguousPronouns = ['it', 'this', 'that', 'they', 'them'];
  const sentences = prompt.split(/[.!?]+/);
  if (sentences.length > 1) {
    const hasAmbiguous = sentences.some((sent, idx) => 
      idx > 0 && ambiguousPronouns.some(pronoun => 
        sent.toLowerCase().includes(` ${pronoun} `)
      )
    );
    
    if (!hasAmbiguous) {
      positives.push('Clear references throughout');
      score += 1;
    } else {
      suggestions.push('Clarify what pronouns like "it" or "this" refer to');
      tips.push('Instead of "analyze it", say "analyze the sales data"');
      score -= 1;
    }
  }
  
  // Check length
  if (prompt.length >= 50 && prompt.length <= 500) {
    positives.push('Good length - detailed but focused');
    score += 1;
  } else if (prompt.length < 50) {
    suggestions.push('Add more detail to clarify your request');
    tips.push('Include what you want, why, and any constraints');
    score -= 2;
  } else if (prompt.length > 500) {
    suggestions.push('Consider breaking into smaller, focused requests');
    tips.push('Long prompts can confuse the AI - try splitting into steps');
    score -= 1;
  }
  
  return {
    score: Math.max(0, Math.min(10, score)),
    positives,
    suggestions,
    tips
  };
}

// SPECIFICITY CHECKER
function checkSpecificity(prompt) {
  let score = 5;
  const positives = [];
  const suggestions = [];
  const tips = [];
  
  // Check for numbers/quantities
  const hasNumbers = /\d+/.test(prompt);
  if (hasNumbers) {
    positives.push('Includes specific quantities or measurements');
    score += 2;
  } else {
    suggestions.push('Add specific numbers when relevant (word count, items, etc.)');
    tips.push('Say "write 500 words" instead of "write a short article"');
    score -= 1;
  }
  
  // Check for examples
  const exampleKeywords = ['like', 'such as', 'for example', 'e.g.', 'similar to'];
  const hasExamples = exampleKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasExamples) {
    positives.push('Provides examples to clarify intent');
    score += 2;
  } else {
    suggestions.push('Add examples to show what you want');
    tips.push('Say "write a function like the one in Python\'s itertools" for clarity');
    score -= 1;
  }
  
  // Check for format specification
  const formatKeywords = ['format', 'style', 'tone', 'bullet', 'list', 'table', 'json', 'markdown'];
  const hasFormat = formatKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasFormat) {
    positives.push('Specifies desired format or style');
    score += 1;
  } else {
    suggestions.push('Specify the format you want (list, paragraph, code, etc.)');
    tips.push('Add "in bullet points" or "as JSON" to get structured output');
  }
  
  return {
    score: Math.max(0, Math.min(10, score)),
    positives,
    suggestions,
    tips
  };
}

// STRUCTURE CHECKER
function checkStructure(prompt) {
  let score = 5;
  const positives = [];
  const suggestions = [];
  const tips = [];
  
  // Check for clear action verb at start
  const actionVerbs = ['write', 'create', 'analyze', 'explain', 'summarize', 'generate', 
                       'design', 'build', 'make', 'help', 'show', 'tell', 'describe'];
  const startsWithAction = actionVerbs.some(verb => 
    prompt.toLowerCase().trim().startsWith(verb)
  );
  
  if (startsWithAction) {
    positives.push('Starts with clear action verb');
    score += 2;
  } else {
    suggestions.push('Start with what you want the AI to do');
    tips.push('Begin with "Create...", "Analyze...", or "Explain..." for clarity');
    score -= 1;
  }
  
  // Check for multiple sentences (shows organization)
  const sentenceCount = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  if (sentenceCount >= 2 && sentenceCount <= 5) {
    positives.push('Well-organized with multiple clear statements');
    score += 1;
  } else if (sentenceCount === 1) {
    suggestions.push('Break into multiple sentences for better organization');
    tips.push('Use one sentence for the task, another for requirements or context');
  }
  
  // Check for constraints or requirements
  const constraintKeywords = ['must', 'should', 'need', 'require', 'without', 'include', 'exclude'];
  const hasConstraints = constraintKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasConstraints) {
    positives.push('Clearly states requirements or constraints');
    score += 2;
  } else {
    suggestions.push('Add any constraints or requirements');
    tips.push('Specify what to include/exclude: "must be under 100 words" or "without technical jargon"');
    score -= 1;
  }
  
  return {
    score: Math.max(0, Math.min(10, score)),
    positives,
    suggestions,
    tips
  };
}

// CONTEXT CHECKER
function checkContext(prompt) {
  let score = 5;
  const positives = [];
  const suggestions = [];
  const tips = [];
  
  // Check for background/context keywords
  const contextKeywords = ['for', 'because', 'since', 'as', 'background', 'context', 
                           'purpose', 'goal', 'audience', 'user', 'customer'];
  const hasContext = contextKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasContext) {
    positives.push('Provides helpful context or background');
    score += 2;
  } else {
    suggestions.push('Add context about why you need this or who it\'s for');
    tips.push('Say "for a beginner audience" or "because I\'m presenting to executives"');
    score -= 1;
  }
  
  // Check for audience specification
  const audienceKeywords = ['beginner', 'expert', 'child', 'student', 'professional', 
                           'technical', 'non-technical', 'audience'];
  const hasAudience = audienceKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasAudience) {
    positives.push('Specifies target audience or expertise level');
    score += 2;
  } else {
    suggestions.push('Mention the audience or expertise level');
    tips.push('Add "explain to a 10-year-old" or "for experienced developers"');
    score -= 1;
  }
  
  // Check for use case or application
  const useCaseKeywords = ['use', 'apply', 'implement', 'project', 'assignment', 
                          'presentation', 'report', 'website', 'app'];
  const hasUseCase = useCaseKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  );
  
  if (hasUseCase) {
    positives.push('Describes how the output will be used');
    score += 1;
  } else {
    suggestions.push('Explain how you\'ll use the result');
    tips.push('Say "for my blog post" or "to implement in my Python project"');
  }
  
  return {
    score: Math.max(0, Math.min(10, score)),
    positives,
    suggestions,
    tips
  };
}