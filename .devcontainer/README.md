# VS Code Devcontainer

> [!IMPORTANT]
>
> **Docker compose won't start with a missing environment file!**

If the container has started successfully, environment variables can be checked with the command below.

```bash
printenv | sort | grep NODE_VERSION
```

## Documentation

- [Use an env file]
- [Docker Compose specific properties]
- [Image or Dockerfile specific properties]

[Use an env file]: https://code.visualstudio.com/remote/advancedcontainers/environment-variables#_option-2-use-an-env-file
[Docker Compose specific properties]: https://containers.dev/implementors/json_reference/#compose-specific
[Image or Dockerfile specific properties]: https://containers.dev/implementors/json_reference/#image-specific
