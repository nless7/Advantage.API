/// <summary>
/// Generic class that handles pagination.
/// </summary>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Helpers
{

    public class PaginatedResponse<T>
    {
        public int Total { get; set; }
        public IEnumerable<T> Data { get; set; }

        /// <summary>
        /// Generic pagination constructor for displaying based on any type.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <param name="index">The index.</param>
        /// <param name="length">The length. (Number of records).</param>
        public PaginatedResponse(IEnumerable<T> data, int index, int length)
        {
            // Example: [1] page, 100 results.
            Data = data.Skip((index - 1) * length).Take(length).ToList();

            //Total number  of results.
            Total = data.Count();
        }
    }
}
