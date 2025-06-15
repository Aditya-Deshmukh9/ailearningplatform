export function courseGenPrompt(
  course_title,
  course_desc,
  category,
  no_of_chapters,
  include_video,
  defficulty_lvl
) {
  return `
    Generate a complete learning course based on the following user input. 
    
    Please include:
    - Course Name
    - Course Description
    - Course Category (e.g., Web Development, AI, Marketing, etc.)
    - Course Level (Beginner, moderate, Advanced)
    - A boolean indicating if the course includes video content
    - A creative Course Banner Image Prompt (see below)
    - A list of chapters, each with:
    - Chapter Name
    - Duration (in hours/minutes)
    - Topics covered under each chapter
    
    🔷 Banner Image Prompt:
    Create a modern, flat-style **3D digital illustration** representing the user's course topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational — ideal for visualizing concepts in the course.
    
    ✅ Output must be in **JSON format only**, matching this schema:
    
    {
        "course": {
            "name": "string",
            "description": "string",
            "category": "string",
            "level": "string",
            "includeVideo": true,
            "bannerImagePrompt": "string",
            "chapters": [
                {
                    "chapterName": "string",
                    "duration": "string",
                    "topics": [
                        "string"
                        ]
                        }
                        ]
                        }
                        }
                        
                        User input: name: ${course_title}, 
description: ${course_desc}, 
category: ${category},
difficulty level: ${defficulty_lvl || "moderate"},
number of chapters: ${no_of_chapters || 5},
include videos: ${include_video !== false}
`;
}

export const chapterGenPrompt = `Depends on Chapter name and Topic Generate content for each topic in HTML
and give response in JSON format.
Schema:{
chapterName:<>,
content:<>
User Input:`;
