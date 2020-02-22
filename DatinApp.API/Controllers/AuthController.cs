using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatinApp.API.Data;
using DatinApp.API.DTOs;
using DatinApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
//FOR JWT Token
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace DatinApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository authRepo, IConfiguration config)
        {
            this._authRepo = authRepo;
            this._config = config;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            //Validate Request
            //if(!ModelState.IsValid)
            //    return BadRequest(ModelState);

            userForRegisterDTO.UserName = userForRegisterDTO.UserName.ToLower();
            if (await _authRepo.UserExists(userForRegisterDTO.UserName))
                return BadRequest("Username already exist");

            var userToCreate = new User() {
                UserName = userForRegisterDTO.UserName
            };

            var createdUser = await _authRepo.Register(userToCreate, userForRegisterDTO.Password);

            return StatusCode(201);
        }


        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserForLoginDTO userForLoginDTO)
        {
            var userFromRepo = await _authRepo.Login(userForLoginDTO.UserName.ToLower(), userForLoginDTO.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return Ok(new { token = tokenHandler.WriteToken(token) });
        }
    }
}