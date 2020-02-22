using System.Threading.Tasks;
using DatinApp.API.Models;

namespace DatinApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string Password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}