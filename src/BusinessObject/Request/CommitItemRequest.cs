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
            this.CommitItems = new List<CommitItemDomain>();
        }

        public string ProjectName;

        public List<CommitItemDomain> CommitItems;
    }
}
