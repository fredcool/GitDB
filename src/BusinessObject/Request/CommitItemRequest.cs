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
        public string ProjectName { get; set; }

        public string CommitMessage { get; set; }

        public List<CommitItemDomain> CommitItems { get; set; }
    }
}
