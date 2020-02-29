using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatinApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatinApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            this._context = context;
            
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(u => u.Id == id);
            return photo;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var Users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return Users;
        }

        public async Task<bool> SaveAll()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            var mainPhoto = await _context.Photos.FirstOrDefaultAsync(x => x.UserId == userId && x.IsMain == true);
            return mainPhoto;
        }
    }

}