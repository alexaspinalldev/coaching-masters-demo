# The Coaching Masters Learning Portal

<img src="https://github.com/user-attachments/assets/68c05d35-3bdf-4237-af3c-fe98b3577239" alt="TCMiphoneScreenshot" width="20%">
<img src="https://github.com/user-attachments/assets/d6eeaae7-ef1c-4595-9ce9-eefbf9f39034" alt="TCMipadScreenshot" width="39%">
<img src="https://github.com/user-attachments/assets/e5977074-8404-440c-8f36-6251bc84e4c8" alt="TCMipadScreenshot2" width="39%">

This project was built as a task for The Coaching Masters.

It uses Next.js 15 (App router), React, Tailwind CSS, ShadCN/UI and v0, Framer Motion, and Supabase with Drizzle ORM.

## Getting started
Follow these steps to clone and set up the project locally.

1. Clone the repository and navigate to the project folder:
```
git clone https://github.com/your-username/your-repo-name.git
```

```
cd cmdemo
```

2. Install dependencies:
```
npm install
```

3. Create a .env file in the root of the project: 
```
touch .env
```
Then populate it with the required variables:
```
DATABASE_URL="[Database URL]"
```

4. Run the development server:
```
npm run dev
```
Open http://localhost:3000 with your browser to view the app.

## Features
The Coaching Masters is a dynamic portal for users to view and consume a library of video content. On initial loading, the user's enrolled modules are recalled from the database and stored as a context. Dynamic routing is then used to generate a page per module, which is then populated by lesson data pulled from the database.

The lessons consist of videos, and the user can also view the transcript of the selected video. When the user has completed a lesson, they can mark it "viewed", which updates the database. Upon returning to that module, any previously viewed videos will be already marked.

The site boasts a simple light/dark mode, which should default to the user's preferred mode. It is responsive across a range of screen widths and passes all accessibility tests in Lighthouse testing.

## Notes
Some time was lost attempting to modify ShadCN/UI components, particularly the navbar. Eventually, I opted to use v0 to generate a few basic blocks to style by hand, and was pleasantly surprised with the results.

I decided to focus on achieving robust backend functionality over spending too much time on frontend design. From my time as a Business Analyst, I firmly believe design choices and UX should be led by the users and stakeholders primarily.

I initially started the project using dummy data in a JSON file, but in hindsight, this time would have been better spent setting up the database from the start, as it wasn’t a drop-in substitute.

Supabase required some troubleshooting, as the link provided in their dashboard didn’t work (see: https://github.com/supabase/supabase/issues/21690). In order to push new migrations, I had to use the "Supavisor" proxy port, as per: https://github.com/drizzle-team/drizzle-orm/issues/2590.

## Outstanding tasks
#### No auth
Currently there is no concept of a specific user, so any real-world implementation would need some form of session ID within the database call to find a specific user's modules.

#### ~~Hydration issue vs rendering issue~~
Where previously I've implemented light/dark mode using a body class, next-themes was new to me. There remains an outstanding hydration issue due to the fact that the theme provider needs to know the client's theme before it can render. This was addressed using a useEffect hook, but this in turn introduced an unsightly layout shift in the header, so I chose to revert it. This would be easily solved in time with a little refactoring, or adding more rigid dimensions to the header content.

Edit: This issue is now resolved by delaying the rendering of the theme-specific UI element, but unconditionally rendering the button around it.

#### Client and Server separation
It was a persistent challenge with this project to juggle client components vs server components. Calls made to the database via Drizzle must be made on server components, which then clashed with the ability to wrap my layout in Framer's \<AnimatePresence />. This was a valuable lesson in planning component nesting, and when to use imported Server Functions vs Fetching from the client-side to the server.

#### Exit animations
Related to the above, exit animations on page transition currently do not work due to the way \<AnimatePresence /> must wrap around only client components. Due to the way the wrapper renders, this then broke the flex of the layout, so I am content with having only enter animations for now.
