using BusinessObject.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Request
{
    public class CommitItemRequest
    {
        public CommitItemRequest()
        {
            this.CommitItems = new List<CommitItemObj>();
        }

        public string ProjectName;

        public List<CommitItemObj> CommitItems;
    }
}
