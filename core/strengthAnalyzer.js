// core/strengthAnalyzer.js

export function analyzePromptStrength(prompt) {
  let totalScore = 0;
  const maxScore = 100;
  const feedback = {
    strengths: [],
    weaknesses: [],
    suggestions: []
  };
  
  // Category 1: Length & Detail (20 points)
  const lengthScore = analyzeLengthDetail(prompt, feedback);
  totalScore += lengthScore;
  
  // Category 2: Clarity & Structure (25 points)
  const clarityScore = analyzeClarityStructure(prompt, feedback);
  totalScore += clarityScore;
  
  // Category 3: Specificity (25 points)
  const specificityScore = analyzeSpecificity(prompt, feedback);
  totalScore += specificityScore;
  
  // Category 4: Context & Constraints (20 points)
  const contextScore = analyzeContext(prompt, feedback);
  totalScore += contextScore;
  
  // Category 5: Actionability (10 points)
  const actionScore = analyzeActionability(prompt, feedback);
  totalScore += actionScore;
  
  // Calculate level (1-3)
  const level = totalScore < 35 ? 1 : totalScore < 70 ? 2 : 3;
  
  return {
    score: totalScore,
    percentage: totalScore,
    level,
    levelName: getLevelName(level),
    breakdown: {
      length: lengthScore,
      clarity: clarityScore,
      specificity: specificityScore,
      context: contextScore,
      actionability: actionScore
    },
    feedback,
    overallAssessment: getOverallAssessment(totalScore)
  };
}

// CATEGORY 1: Length & Detail
function analyzeLengthDetail(prompt, feedback) {
  let score = 0;
  const wordCount = prompt.split(/\s+/).length;
  const charCount = prompt.length;
  
  if (charCount < 50) {
    feedback.weaknesses.push("Prompt is too short and lacks detail");
    feedback.suggestions.push("Expand your prompt to at least 50 characters with more specific details");
    score = 0;
  } else if (charCount < 100) {
    feedback.weaknesses.push("Prompt could use more detail");
    feedback.suggestions.push("Add more context about what you want and why");
    score = 10;
  } else if (charCount < 300) {
    feedback.strengths.push("Good length with adequate detail");
    score = 20;
  } else if (charCount < 500) {
    feedback.strengths.push("Comprehensive length with detailed information");
    score = 20;
  } else {
    feedback.weaknesses.push("Prompt may be too long and unfocused");
    feedback.suggestions.push("Consider breaking into smaller, focused prompts");
    score = 15;
  }
  
  return score;
}

// CATEGORY 2: Clarity & Structure
function analyzeClarityStructure(prompt, feedback) {
  let score = 0;
  
  // Check for clear action verb at start
  const startsWithAction = /^(write|create|explain|analyze|summarize|generate|design|build|help|describe|list|compare|evaluate|provide|give|show|tell|make)/i.test(prompt.trim());
  if (startsWithAction) {
    feedback.strengths.push("Starts with a clear action verb");
    score += 8;
  } else {
    feedback.weaknesses.push("Unclear what action you want the AI to take");
    feedback.suggestions.push('Start with a clear verb like "Write...", "Explain...", or "Create..."');
  }
  
  // Check for vague language
  const vagueWords = ['something', 'anything', 'stuff', 'things', 'good', 'better', 'nice'];
  const hasVague = vagueWords.some(word => prompt.toLowerCase().includes(word));
  if (!hasVague) {
    feedback.strengths.push("Uses specific, concrete language");
    score += 8;
  } else {
    feedback.weaknesses.push("Contains vague language that reduces clarity");
    feedback.suggestions.push("Replace vague words like 'something' or 'good' with specific terms");
  }
  
  // Check sentence structure
  const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length >= 2 && sentences.length <= 5) {
    feedback.strengths.push("Well-structured with multiple clear statements");
    score += 9;
  } else if (sentences.length === 1) {
    feedback.suggestions.push("Break your request into multiple sentences for better organization");
  } else if (sentences.length > 5) {
    feedback.suggestions.push("Simplify structure - too many sentences may dilute focus");
    score += 5;
  }
  
  return Math.min(score, 25);
}

// CATEGORY 3: Specificity
function analyzeSpecificity(prompt, feedback) {
  let score = 0;
  
  // Check for numbers/quantities
  const hasNumbers = /\d+/.test(prompt);
  if (hasNumbers) {
    feedback.strengths.push("Includes specific quantities or measurements");
    score += 8;
  } else {
    feedback.suggestions.push('Add specific numbers like "500 words" or "5 examples"');
  }
  
  // Check for examples
  const hasExamples = /like|such as|for example|e\.g\.|for instance|similar to/i.test(prompt);
  if (hasExamples) {
    feedback.strengths.push("Provides examples to clarify intent");
    score += 8;
  } else {
    feedback.suggestions.push("Include examples to show what you're looking for");
  }
  
  // Check for format specification
  const formatKeywords = /bullet|list|table|paragraph|essay|json|markdown|numbered|format|structure/i;
  if (formatKeywords.test(prompt)) {
    feedback.strengths.push("Specifies desired output format");
    score += 9;
  } else {
    feedback.suggestions.push('Specify format like "in bullet points" or "as a table"');
  }
  
  return Math.min(score, 25);
}

// CATEGORY 4: Context & Constraints
function analyzeContext(prompt, feedback) {
  let score = 0;
  
  // Check for audience specification
  const hasAudience = /for (a |an |)(beginner|expert|child|student|professional|novice|advanced|general audience)/i.test(prompt);
  if (hasAudience) {
    feedback.strengths.push("Defines target audience");
    score += 7;
  } else {
    feedback.suggestions.push('Specify audience like "for beginners" or "for experts"');
  }
  
  // Check for constraints
  const hasConstraints = /must|should|without|don't|avoid|exclude|include|require|need|less than|more than|under|over/i.test(prompt);
  if (hasConstraints) {
    feedback.strengths.push("Includes helpful constraints or requirements");
    score += 7;
  } else {
    feedback.suggestions.push("Add constraints like what to include/avoid");
  }
  
  // Check for purpose/context
  const hasPurpose = /because|since|for (my|a|the)|to help|in order to|purpose|goal|aim/i.test(prompt);
  if (hasPurpose) {
    feedback.strengths.push("Provides context about purpose or goal");
    score += 6;
  } else {
    feedback.suggestions.push("Explain why you need this or how you'll use it");
  }
  
  return Math.min(score, 20);
}

// CATEGORY 5: Actionability
function analyzeActionability(prompt, feedback) {
  let score = 0;
  
  // Check if prompt is actionable (not just a question)
  const isActionable = /write|create|generate|make|build|design|develop|produce|draft/i.test(prompt);
  if (isActionable) {
    feedback.strengths.push("Clear, actionable request");
    score += 5;
  }
  
  // Check for complete thought
  const hasCompleteThought = prompt.trim().length > 30 && prompt.includes(' ');
  if (hasCompleteThought) {
    score += 5;
  }
  
  return score;
}

// Helper functions
function getLevelName(level) {
  switch(level) {
    case 1: return "Weak";
    case 2: return "Moderate";
    case 3: return "Strong";
    default: return "Unknown";
  }
}

function getOverallAssessment(score) {
  if (score < 20) {
    return "Your prompt needs significant improvement. It lacks key elements that help AI understand what you want.";
  } else if (score < 40) {
    return "Your prompt is weak and will likely produce generic or unsatisfactory results. Add more detail and specificity.";
  } else if (score < 60) {
    return "Your prompt is moderate. It has some good elements but could be more specific and structured.";
  } else if (score < 80) {
    return "Your prompt is strong! It has most of the elements needed for a good AI response. Minor improvements could make it excellent.";
  } else {
    return "Excellent prompt! This is well-structured, specific, and clear. You should get high-quality results.";
  }
}