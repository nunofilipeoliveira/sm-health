# SmHealth

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Development server

To start a local development server, run:

```bash
ng serve --proxy-config proxy.conf.json
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Configuration

### Environment Variables

The application uses environment files to configure API URLs:

- **Development**: `src/environments/environment.ts` (apiUrl: 'http://localhost:8080')
- **Production**: `src/environments/environment.prod.ts` (apiUrl: 'https://sm-health-core.onrender.com')

See [ENVIRONMENT_README.md](ENVIRONMENT_README.md) for detailed documentation.

### Proxy Configuration

During development, the `proxy.conf.json` file redirects API requests to the backend server:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

## Building

### Development Build
```bash
ng build --configuration=development
```

### Production Build
```bash
ng build --configuration=production
# or
ng build --prod
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Docker

For Docker configuration, see the [Docker README](sm-health-core/DOCKER_README.md) in the sm-health-core directory.
