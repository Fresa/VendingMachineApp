using System.Web.Http;

namespace VendingMachineAPI.Controllers
{
    [RoutePrefix("api/v1")]
    public class VendingMachineController : ApiController
    {
        [HttpPost]
        [Route("products/{productId}/buttons/{buttonId}")]
        public IHttpActionResult PayAndVend([FromUri] int productId, [FromUri] int buttonId)
        {
            return null;
        }
    }
}