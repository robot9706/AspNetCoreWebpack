using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreWebpack.NPM
{
    public class NodeRunnerService : IHostedService
    {
        private NpmScriptRunner runner;

        private string scriptName;
        private string workingDirectory;
        private Dictionary<string, string> environment;
        private ILogger<NodeRunnerService> logger;

        public NodeRunnerService(string script, string workingDirectory, Dictionary<string, string> env, ILogger<NodeRunnerService> logger)
        {
            scriptName = script;
            this.workingDirectory = workingDirectory;
            environment = env ?? new Dictionary<string, string>();
            this.logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            runner = new NpmScriptRunner(workingDirectory, scriptName, null, environment);
            runner.AttachToLogger(logger);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            runner.Stop();

            return Task.CompletedTask;
        }
    }

    static class NodeRunnerExtensions
    {
        public static void UseNpmScript(this IServiceCollection services, string scriptName, Dictionary<string, string> env = null)
        {
            services.AddSingleton<IHostedService>(provider =>
            {
                ILogger<NodeRunnerService> logger = provider.GetRequiredService<ILogger<NodeRunnerService>>();

                return new NodeRunnerService(scriptName, Directory.GetCurrentDirectory(), env, logger);
            });
        }
    }
}
