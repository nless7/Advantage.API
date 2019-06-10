using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Message
{
    public class ServerMessage
    {
        public Guid Id { get; set; }
        public string Payload { get; set; }

    }
}
