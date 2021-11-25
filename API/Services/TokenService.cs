using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // 5 things you need to generate a JWT
        // 1. username
        // 2. algorithm
        // 3. role/claim
        // 4. key (secret/salt)
        // 5. other info

        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            // get the key (4th item to generate JWT) from config and keep this under secrets 
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        //              get the user (1st item to generate JWT) as a parameter
        public string CreateToken(AppUser user)
        {
            // 
            // adding claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Username)
            };

            // var claims = new []
            // {
            //     new Claim("Issuer", "Richie"),
            //     new Claim("Admin", "true"),
            //     new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
            // };

            // to sign the token we need combination of key and algorithm
            // and hence called as the signing credentials
            // (2nd and 4th itme to generate JWT)
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // describe how the token is going to look
            // collection of all items to generate the JWT
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            // create token handler to create and write tokens
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }
    }
}