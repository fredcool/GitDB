using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class GetAllProjectsResponse : Status
    {
        public GetAllProjectsResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
        }

        public List<string> ProjectNames;
    }
}
