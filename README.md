This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Project Overview

## What We're Aiming For

- **Strong SEO**: Generate the most clicks with semantic HTML and server-rendered clients.
- **Interactivity**: Accept user input and provide responsive results.
- **Scalability**: Ready for the future addition of features with minimal effort.
- **Cost-Effectiveness**: Delivering value while maintaining a low overhead.
- **Case Study Consideration**: The project doesn't need to generate revenue at this stage.

## Architecture

### Client

#### Astro with React

- Minifies the JavaScript payload sent to the client, improving SEO and web metrics.
- Partial hydration system only activates components that require interactivity.
- Static parts of the page remain untouched, reducing the need for JavaScript.
- Out-of-the-box performance is excellent, without the overhead of a traditional SPA.
- However, it's less suited for dynamic updates based on user input, so we opted for Next.js instead.

#### Next.js

- Balances the need for SEO optimization with dynamic interactivity.
- Server-Side Rendering (SSR) improves accessibility to search engines and secures API route handling.
- The framework focuses on optimizations like code splitting and image optimization, increasing engagement rates and clicks.

#### Vanilla JavaScript

- For simplicity and control over the project, where frameworks are not necessary.

### Hosting

#### AWS

- **S3 Bucket**: For the client, with @edge Lambda for server-side rendering and CloudFront distribution.
- **AWS Fargate**: Docker containers orchestrated by ECS, load balancing, and service configuration. Cost-effective at scale but requires significant setup.
- Decided to go with Vercel to avoid the significant setup required the leverage the benefits of server rendering

#### Vercel

- Deploy Next.js with zero configuration, SSR, and edge Lambda.
- Convenient and free until traffic scales or monetization is necessary.

### Server

#### Express.js Backend

- Integrated within Next.js for SSR and development simplicity.
- Uniform TypeScript usage across the client and server.

#### Golang Serverless

- Performance-focused and auto-scales with demand, reducing server costs.
- Rich library ecosystem and decoupling from the client.
- Went with express.js because I do not have a golang environment set up

- #### C# Serverless

- Performance-focused and auto-scales with demand, reducing server costs.
- Integrates with existing C# services if previously used
- Performs proficiency in C#
- Went with express.js because of the required environment setup and integration with AWS sdk

### Speed analytics

#### Google lighthouse
- Provides very detailed reports of performance and best practices
- Very flexible
- Free
- Requires a bit of setup
- Went with Vercel because of ease of integration and I do not need exremely detailed analytics for now
  
#### Vercel Speed Insights 
- Vercel Speed Insights utilizes data from real users to provide insights, offering a real-world perspective on performance
- For projects hosted on Vercel, it offers a tightly integrated experience, making it easy to access and monitor performance data directly from the Vercel dashboard.
- Automatic Monitoring: It tracks the performance of your deployments over time, alerting you to any significant changes or regressions.
- Performance Budgets: It allows setting performance budgets to ensure your site meets certain performance criteria, helping to maintain an optimal user experience.
- More user focused
  
## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is open-sourced under the [MIT license](LICENSE).

## Contact

- For more information, reach out to us at [contact@example.com](mailto:contact@example.com).

