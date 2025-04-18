# The Coaching Master Learning Portal

This project was built as a task for The Coaching Masters.

It uses Next.js 15 (App router), React, Tailwind CSS, ShadCN/UI and v0, Framer Motion, and Supabase with Drizzle ORM.

## Getting started
Follow these steps to clone and set up the project locally.

1. Clone the repository and navigate to the project folder
```
git clone https://github.com/your-username/your-repo-name.git
```

```
cd cmdemo
```

2. Install dependencies
```
npm install
```

3. Create a .env file
Create a .env file in the root of the project. 
```
touch .env
```
Then populate it with the required variables:
```
DATABASE_URL="[Database URL]"
```

4. Run the development server
```
npm run dev
```
Open http://localhost:3000 with your browser to view the app.

## Features
The Coaching Masters is a dynamic portal for users to view and consume a library of video content. On initial loading, the user's enrolled modules are recalled from the database and stored as a context. Dynamic routing is then used to generate a page per module, which is then populated by lesson data pulled from the database.

The lessons consist of videos, and the user also view the transcript of the selected video. When the user has completed a lesson, they can mark it "viewed", which updates the database. Upon returning to that module, any previously viewed videos will be already marked.

The site boasts a simple light/dark mode, which should default to the user's preferred mode.

## Notes
Some time was lost trying to modify the ShadCN/UI library components, particularly the navbar. In the end for the more complex items I elected to try using v0 to generate a few basic blocks for me to style, and was pleasantly surprised with the results.

I started the project with some dummy data in a JSON file, but in hindsight this time would have been better spent just setting up the database as it was not a drop-in substitution.

Some Supabase troubleshooting was required as the link supplied by their dashboard does not work, as per:
https://github.com/supabase/supabase/issues/21690.

In order to push new migrations to my database, I needed to use the "Supavisor" proxy port, as per https://github.com/drizzle-team/drizzle-orm/issues/2590.

## Outstanding tasks
#### No auth
Currently there is no concept of a specific user, so any real-world implementation would need some form of session ID within the databse call to fiund a specific user's modules

#### Hydration issue vs rendering issue
Where previously I've implemented light/dark mode using a body class, next-themes was new to me. There remains and outstanding hydration issue due to the fact that the theme provider needs to know the client's theme before it can render. This was accommodated for using a useEffect hook, but this in turn created an unsightly layout shift in the header, so I chose to revert it. This would be easilyt solved in time with a little refactoring, or adding more rigid dimentsion to the header content.

#### No typing from schema
In my other similar projects I have used Zod to infer types from my database schema but I did not do this here in the interest of time. Instead types are explicitly declared and exported.

#### Client and Server separation
It was a persistent challenge with this project to juggle client components vs server components. Calls made to the databse via Drizzle must be made on server components, which then clashed with the ability to wrap my layout in Framer's \<AnimatePresence />. This is something that could do with more dedicated work to tidy project-wide, I feel.

#### Exit animations
Related to the above, exit animation on page transition currently do not work due to the way \<AnimatePresence /> must wrap around only client components. Due to the way the wrapper renders, this then broke the flex of the layout, so I am content with having only enter animations for now.