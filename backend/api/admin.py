from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'date_of_birth',
        'gender',
        'phone_number',
        'blood_group',
        'genotype',
    )
    search_fields = ('full_name', 'phone_number', 'email')
    list_filter = ('gender', 'blood_group', 'genotype')
