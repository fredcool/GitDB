using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{
    public class Common
    {
        public static int SendEmail(string email, string subject, string body)
        {
            /*var gmailClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("gdbsyssprt@gmail.com", "Apple@334")
            };*/

            SmtpClient gmailClient = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new System.Net.NetworkCredential("myid@gmail.com", "mypassword"),
                EnableSsl = true,
                Timeout = 10000
            };

            string from = "gdbsyssprt@gmail.com";
            using (var msg = new System.Net.Mail.MailMessage(from, email, subject, body))
            {
                try
                {
                    gmailClient.Send(msg);
                }
                catch (Exception)
                {
                    return 1;
                }
            }
            return 0;
        }
    }
}
