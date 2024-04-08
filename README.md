## Aeonaxy Assignment

### Dribbble Auth Clone: Full Stack Dev Internship

```FRONTEND```

<hr>

This is the frontend of the assignment for full-stack development internship opening at Aeonaxy Technologies. This
particular assignment is created using Next.Js, the React framework for the web. Tailwind CSS has been used for the
styling purposes.

You can find the backend of the assignment [here](https://github.com/pingSubhajit/dribbble-auth-clone-legacy-backend)
and the backend has been deployed [here](http://dribbble.subhajitkundu.me/).

### Features
- **Login and Signup**: The user can login and signup using the application.
- **Protected Routes**: The user can only access the home page after logging in.
- **Log out**: The user can log out of the application.
- **Automatic redirection**: The user will be redirected to the relevant page based on their onboarding stage.
- **Verify email**: The user will be asked to verify their email after signing up.
- **Change email**: The user can change their email address on the /verify page.
- **Resend verification email**: The user can resend the verification email if they haven't received it.
- **Responsive Design**: The application is fully responsive and can be used on any device.

### Local development server

- First clone the repository and run `npm install` to install all the dependencies.
- Run `npm run dev` to start the development server.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment variables
- Create a `.env` file in the root directory of the project.
- Add the following environment variables in the `.env` file:
  ```bash
  BACKEND="https://dribbble.subhajitkundu.me/api" // Or the local backend server URL suffixed with /api
  ```

### Idea behind using Next.Js

Next.Js is a React framework that is used to create server-side rendered applications. It is a very powerful tool
that can be used to create static websites, server-side rendered websites, and also single page applications. It is
very easy to use and has a lot of features that can be used to create a very powerful application.

- **Industry standard**: React is hardly used in production in industries where the product is the web application
  itself.Next.Js is an industry standard for creating React applications.
- **Server-side rendering**: Next.Js is used to create server-side rendered applications. This means that the server
  will render the page and send it to the client. This is very useful for SEO purposes as the search engines can
  easily crawl the website and index it.
- **Full stack capabilities**: Next.Js has full stack capabilities. This means that you can create both the front-end
  and the back-end of the application using Next.Js. You can create APIs, connect to databases, and do a lot more
  using Next.Js.
- **Meaning abstractions**: Next.Js has a lot of abstractions that make it very easy to create applications. You can
  create pages, components, and layouts and play with advanced react features such as React.lazy and suspence without significant overhead.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) for more information.

### Deployment

This application has been deployed on Vercel. You can check out the live
demo [here](https://dribbble-auth-clone-legacy-aeonaxy.vercel.app/).
