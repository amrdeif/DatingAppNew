using System;

namespace DatinApp.API.DTOs
{
    public class PhotosForDetailedDTO
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

    }
}