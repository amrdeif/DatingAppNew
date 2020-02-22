using System.ComponentModel.DataAnnotations;
namespace DatinApp.API.DTOs
{
    public class UserForLoginDTO
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}