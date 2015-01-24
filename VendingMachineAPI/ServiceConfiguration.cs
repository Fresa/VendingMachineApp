using System.Web.Http;
using System.Web.Http.Dependencies;
using Owin;
using TinyIoC;
using VendingMachineAPI.Ioc;

namespace VendingMachineAPI
{
    public class ServiceConfiguration
    {
        public void Configuration(IAppBuilder app)
        {
            var config = HttpConfiguration();
            app.UseWebApi(config);
        }

        private HttpConfiguration HttpConfiguration()
        {
            var config = new HttpConfiguration {DependencyResolver = ConfigureIoc()};

            config.MapHttpAttributeRoutes();

            return config;
        }

        private static IDependencyResolver ConfigureIoc()
        {
            var container = TinyIoCContainer.Current;

            return new TinyIoCResolver(container);
        }
    }
}