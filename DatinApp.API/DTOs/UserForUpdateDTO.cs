using System.ComponentModel.DataAnnotations;

namespace DatinApp.API.DTOs
{
    public class UserForUpdateDTO
    {
        [Required(ErrorMessage = "Introduction is required")]
        public string Introduction { get; set; }

        [Required(ErrorMessage = "LookinFor is required")]
        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }
    }
}