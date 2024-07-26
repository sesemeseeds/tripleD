# Generated by Django 5.0.7 on 2024-07-26 20:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('Food & Beverages', 'Food & Beverages'), ('Apparel & Accessories', 'Apparel & Accessories'), ('Toys & Games', 'Toys & Games'), ('Electronics', 'Electronics'), ('Home & Kitchen', 'Home & Kitchen'), ('Beauty & Personal Care', 'Beauty & Personal Care'), ('Sports & Outdoors', 'Sports & Outdoors'), ('Health & Wellness', 'Health & Wellness'), ('Books & Media', 'Books & Media'), ('Automotive', 'Automotive'), ('Office Supplies', 'Office Supplies'), ('Pet Supplies', 'Pet Supplies')], max_length=255),
        ),
        migrations.AlterField(
            model_name='product',
            name='warehouse',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.warehouse'),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='address',
            field=models.CharField(choices=[('123 Main St, City, Country', '123 Main St, City, Country'), ('456 Elm St, City, Country', '456 Elm St, City, Country'), ('789 Maple Ave, City, Country', '789 Maple Ave, City, Country')], max_length=255, primary_key=True, serialize=False),
        ),
    ]
