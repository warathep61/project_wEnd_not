<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pain_tines', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // ชื่อภาพวาด
            $table->text('description')->nullable(); // คำอธิบายภาพวาด
            $table->string('artist_name'); // ชื่อศิลปิน
            $table->string('medium'); // สื่อที่ใช้ (เช่น สีน้ำมัน, สีน้ำ)
            $table->string('style'); // รูปแบบการวาด (เช่น Impressionism, Realism)
            $table->integer('year_created'); // ปีที่สร้างภาพวาด
            $table->string('dimensions')->nullable(); // ขนาดของภาพวาด
            $table->decimal('price', 10, 2)->nullable(); // ราคา
            $table->string('location')->nullable(); // ที่อยู่ของภาพวาด (แกลเลอรี่หรือพิพิธภัณฑ์)
            $table->string('image_path')->nullable(); // เส้นทางที่เก็บรูปภาพไฟล์
            $table->date('exhibition_date')->nullable(); // วันที่แสดงนิทรรศการ
            $table->string('gallery')->nullable(); // ชื่อแกลเลอรี่ที่แสดงภาพ
            $table->boolean('is_sold')->default(false); // ภาพวาดขายหรือยัง
            $table->string('category')->nullable(); // หมวดหมู่ของภาพวาด
            $table->decimal('rating', 2, 1)->nullable(); // คะแนนความนิยม (เช่น 4.5)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pain_tines');
    }
};
