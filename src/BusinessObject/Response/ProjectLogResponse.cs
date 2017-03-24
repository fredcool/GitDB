using BusinessObject.BusinessObjects;
using BusinessObject.Dictionary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Response
{
    public class ProjectLogResponse : Status
    {
        public ProjectLogResponse()
        {
            this.StatusCode = StatusCodes.Status_Success;
            this.FullLog = "";
            this.logs = new List<CommitLogBo>();
        }

        public List<CommitLogBo> logs;

        public string FullLog;
    }
}
