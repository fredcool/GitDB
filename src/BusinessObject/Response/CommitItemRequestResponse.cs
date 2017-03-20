using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class CommitItemRequestResponse : Status
    {
        public CommitItemRequestResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
        }
    }
}
