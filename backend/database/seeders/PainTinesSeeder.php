<?php

namespace Database\Seeders;

use App\Models\PainTines;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PainTinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PainTines::insert([
            [
                'title' => 'Starry Night',
                'description' => 'A famous painting by Vincent van Gogh.',
                'artist_name' => 'Vincent van Gogh',
                'medium' => 'Oil on canvas',
                'style' => 'Post-Impressionism',
                'year_created' => 1889,
                'dimensions' => '73.7 cm × 92.1 cm',
                'price' => 100000.00,
                'location' => 'Museum of Modern Art, New York',
                'image_path' => 'images/starry_night.jpg',
                'exhibition_date' => '2024-01-15',
                'gallery' => 'Museum of Modern Art',
                'is_sold' => false,
                'category' => 'Landscape',
                'rating' => 4.9,
            ],
            [
                'title' => 'The Persistence of Memory',
                'description' => 'A surrealist painting by Salvador Dalí.',
                'artist_name' => 'Salvador Dalí',
                'medium' => 'Oil on canvas',
                'style' => 'Surrealism',
                'year_created' => 1931,
                'dimensions' => '24 cm × 33 cm',
                'price' => 200000.00,
                'location' => 'Museum of Modern Art, New York',
                'image_path' => 'images/persistence_of_memory.jpg',
                'exhibition_date' => '2024-08-10',
                'gallery' => 'Museum of Modern Art',
                'is_sold' => false,
                'category' => 'Surrealism',
                'rating' => 4.7,
            ],
            [
                'title' => 'Mona Lisa',
                'description' => 'A portrait of a woman by Leonardo da Vinci.',
                'artist_name' => 'Leonardo da Vinci',
                'medium' => 'Oil on poplar',
                'style' => 'Renaissance',
                'year_created' => 1503,
                'dimensions' => '77 cm × 53 cm',
                'price' => 8500000.00,
                'location' => 'Louvre Museum, Paris',
                'image_path' => 'images/mona_lisa.jpg',
                'exhibition_date' => '2024-05-01',
                'gallery' => 'Louvre Museum',
                'is_sold' => false,
                'category' => 'Portrait',
                'rating' => 4.8,
            ]
        ]);
    }
}
