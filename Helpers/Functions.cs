using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Advantage.API.Models;

namespace Advantage.API.Helpers
{
    public class Functions
    {
        private static Random rand = new Random();
        private const int MinRandomOrderTotal = 100;
        private const int MaxRandomOrderTotal = 5000;
        private const double StartAmountOfDays = -90;
        private const int MinLeadTimeDays = 7;
        

        /// <summary>
        /// Gets a random item from the list provided.
        /// </summary>
        /// <param name="items">The items.</param>
        /// <returns>The string.</returns>
        private static string GetRandom(IList<string> items)
        {
            //Return the items at a random index from a list of items that is parsed.
            return items[rand.Next(items.Count)];
        }

        /// <summary>
        /// Generates a random customer name.
        /// </summary>
        /// <returns>The customer name.</returns>
        internal static string MakeUniqueCustomerName(List<string> names)
        {
            var maxNames = firstNameList.Count * surNameList.Count;

            if (names.Count >= maxNames)
            {
                throw new System.InvalidOperationException("Maximum number of unique names exceeded.");
            }

            var firstname = GetRandom(firstNameList);
            var surname = GetRandom(surNameList);
            var fullName = $"{firstname} {surname}";

            //Recursive call. (Can be expensive on resources but ok for this simple solution).
            if (names.Contains(fullName))
            {
                MakeUniqueCustomerName(names);
            }

            return fullName;
        }

        /// <summary>
        /// Create customer email address.
        /// </summary>
        /// <param name="customerName">The customer name.</param>
        /// <returns>The customer email.</returns>
        internal static string MakeCustomerEmail(string customerName)
        {
            if (string.IsNullOrEmpty(customerName))
            {
                throw new Exception("Couldn't create email because there's no customer name.");
            }

            var removeSpaceFromName = customerName.Replace(" ", "");
            return $"contact@{removeSpaceFromName.ToLower()}.com";
        }

        /// <summary>
        /// Generate a random order completed date.
        /// </summary>
        /// <param name="orderPlaced">The date in the past.</param>
        /// <returns>The date.</returns>
        internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
        {
            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(MinLeadTimeDays);
            var timePassed = now - orderPlaced;

            if (timePassed < minLeadTime)
            {
                return null;
            }

            return orderPlaced.AddDays(rand.Next(7, 14));
        }

        /// <summary>
        /// Create a random postcode.
        /// </summary>
        /// <returns>The postcode</returns>
        internal static string GetRandomPostCode()
        {
            return GetRandom(postCodeList);
        }

        /// <summary>
        /// Generate a random order date.
        /// </summary>
        /// <returns>The date.</returns>
        internal static DateTime GetRandomOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(StartAmountOfDays);

            TimeSpan possibleSpan = end - start;

            //Random number of minutes between now and 90 days ago.
            TimeSpan newSpan = new TimeSpan(0, rand.Next(0, (int)possibleSpan.TotalMinutes), 0);

            return start + newSpan;
        }

        /// <summary>
        /// Create some prefix characters.
        /// </summary>
        private static readonly List<string> firstNameList = new List<string>()
        {
            "Joseph", "Ria", "James", "Veronica", "Joshua", "Natalie",
            "Matthew", "Hazel", "Daniel", "Maisie", "Alexander", "Josie",
            "Michael", "Hollie"
        };

        /// <summary>
        /// Get the random order total to be used for creating order seed.
        /// </summary>
        /// <returns>The total.</returns>
        internal static decimal GetRandomOrderTotal()
        {
            return rand.Next(MinRandomOrderTotal, MaxRandomOrderTotal);
        }

        /// <summary>
        /// Create some suffix characters.
        /// </summary>
        private static readonly List<string> surNameList = new List<string>()
        {
            "Campbell", "Bryant", "Riley", "Parker", "Anderson", "Shaw",
            "Trelawney", "Rogers", "Richardson", "Griffin", "Green",
            "Gordon", "Anderson", "Gonzales"
        };

        /// <summary>
        /// List of UK postcodes.
        /// </summary>
        internal static readonly List<string> postCodeList = new List<string>()
        {
            "AB","AL","B","BA","BB","BD","BH",
            "BL","BN","BR","BS","BT","CA","CB",
            "CF","CH","CM","CO","CR","CT","CV",
            "CW","DA","DD","DE","DG","DH","DL",
            "DN","DT","DY","E","EC","EH","EN",
            "EX","FK","FY","G","GL","GU","HA",
            "HD","HG","HP","HR","HS","HU","HX",
            "IG","IP","IV","KA","KT","KW","KY",
            "L","LA","LD","LE","LL","LD","LE",
            "LL","LN","LS","LU","M","ME","MK",
            "ML","N","NE","NG","NN","NP","NR",
            "NW","OL","OX","PA","PE","PH","PL",
            "PO","PR","RG","RH","RM","S","SA",
            "SE","SG","SK","SL","SM","SN","SO",
            "SP","SR","SS","ST","SW","SY","TA",
            "TD","TF","TN","TN","TQ","TR","TS",
            "TW","UB","W","WA","WC","WD","WF",
            "WN","WR","WS","WV","YO","ZE"
        };

        /// <summary>
        /// Extracts the firstname from the fullname string.
        /// </summary>
        /// <param name="fullName">The full name.</param>
        /// <returns>The firstname.</returns>
        internal static string GetFirstName(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
            {
                throw new InvalidOperationException("Cannot process firstname because fullname is empty.");
            }

            var splitName = fullName.Split(" ");
            var firstName = splitName[0];
            return firstName;
        }

        /// <summary>
        /// Extracts the lastname from the fullname string.
        /// </summary>
        /// <param name="fullName">The full name.</param>
        /// <returns>The lastname.</returns>
        internal static string GetFLastName(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
            {
                throw new InvalidOperationException("Cannot process lastname because fullname is empty.");
            }

            var splitName = fullName.Split(" ");
            var lastName = splitName[1];
            return lastName;
        }
    }
}
