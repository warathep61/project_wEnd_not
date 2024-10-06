<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PainTines extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'artist_name',
        'medium',
        'style',
        'year_created',
        'dimensions',
        'price',
        'location',
        'image_path',
        'exhibition_date',
        'gallery',
        'is_sold',
        'category',
        'rating',
    ];
}
