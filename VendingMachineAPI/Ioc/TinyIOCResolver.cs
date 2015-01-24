using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;
using TinyIoC;

namespace VendingMachineAPI.Ioc
{
    public class TinyIoCResolver : IDependencyResolver
    {
        private readonly TinyIoCContainer _container;

        public TinyIoCResolver(TinyIoCContainer container)
        {
            _container = container;
        }

        public object GetService(Type serviceType)
        {
            object service;
            _container.TryResolve(serviceType, out service);
            return service;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _container.ResolveAll(serviceType, true);
        }

        public IDependencyScope BeginScope()
        {
            return this;
        }

        public void Dispose()
        {
            _container.Dispose();
        }
    }
}