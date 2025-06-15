# Furnish Ecommerce Backend

This is the backend service for **Furnish**, a furniture ecommerce platform built with [NestJS](https://nestjs.com). It handles user authentication, product management, order processing, and payment handling.

### Key Features

- ✅ Built with [NestJS](https://nestjs.com)
- 🧩 Database powered by [**Supabase**](https://supabase.com/)
- 💳 Payment gateway integration using [**Xendit**](https://www.xendit.co/id/)
- ⚙️ **Supabase webhook** triggers to automatically create invoices in Xendit when a new row is inserted into the `payments` table
- 🚀 Deployment using **Docker**, **Alibaba Cloud (SAS)**, **Nginx**, and **GitHub Actions**
- 🗃️ ORM powered by [**TypeORM**](https://typeorm.io/)
- 🔐 Secure authentication using [**JWT**](https://jwt.io/)

### API Documentation

Interactive API documentation is available via Swagger:

🔗 https://api.furnish.danar-alifian.xyz/swagger/docs

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

This project is deployed using:

**Docker**: for containerizing the application.

**Alibaba Cloud Simple Application Server (SAS)**: as the virtual private server (VPS) host.

**Nginx**: as a reverse proxy to serve the NestJs app.

**GitHub Actions**: for continuous integration and deployment **(CI/CD)**.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to Alibaba Cloud SAS with Docker, Nginx, and GitHub Actions for a scalable backend setup.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Authors

- [@danaralifian](https://www.linkedin.com/in/danar-alifian-1a1581174/)

## Authors

- [@danaralifian](https://www.linkedin.com/in/danar-alifian-1a1581174/)
