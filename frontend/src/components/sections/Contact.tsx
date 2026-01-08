import { useState } from 'react';
import { Mail, MapPin, Phone, ChevronDown, Check } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        companyName: '',
        companyWebsite: '',
        companySize: '',
        advertiseOn: [] as string[],
        agreeToMarketing: false,
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const countries = [
        'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 
        'Germany', 'France', 'Singapore', 'UAE', 'Other'
    ];

    const companySizes = [
        '1-10 employees', '11-50 employees', '51-200 employees', 
        '201-500 employees', '500+ employees'
    ];

    const advertiseOptions = [
        'Search Ads', 'Social Media', 'Display & Native', 'Programmatic Buying', 'Other'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
            const config = {};
            await axios.post(`${API_URL}/api/contacts`, {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                subject: `Inquiry from ${formData.companyName}`,
                message: `
                    Phone: ${formData.phone}
                    Country: ${formData.country}
                    Company: ${formData.companyName}
                    Website: ${formData.companyWebsite}
                    Company Size: ${formData.companySize}
                    Advertises On: ${formData.advertiseOn.join(', ')}
                    Message: ${formData.message}
                `
            }, config);
            setStatus('success');
            setFormData({ 
                firstName: '', lastName: '', email: '', phone: '', 
                country: '', companyName: '', companyWebsite: '', 
                companySize: '', advertiseOn: [], agreeToMarketing: false, message: '' 
            });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            if (name === 'agreeToMarketing') {
                setFormData({ ...formData, agreeToMarketing: checked });
            } else {
                // Handle advertiseOn checkboxes
                if (checked) {
                    setFormData({ ...formData, advertiseOn: [...formData.advertiseOn, value] });
                } else {
                    setFormData({ ...formData, advertiseOn: formData.advertiseOn.filter(item => item !== value) });
                }
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <section id="contact" className="relative pt-10 pb-12 md:pb-16 overflow-hidden" style={{ backgroundColor: '#e8e4dc' }}>
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a4d4d]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1a4d4d]/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6" style={{ color: '#1a4d4d' }}>
                        Contact Us
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Ready to transform your brand? Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Main Form Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1a4d4d]/5 to-transparent rounded-bl-full" />
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                        placeholder=""
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Work Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Work Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                    placeholder=""
                                />
                            </div>

                            {/* Mobile Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Mobile Phone <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                    placeholder=""
                                />
                            </div>

                            {/* Country */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">Please Select</option>
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                    placeholder=""
                                />
                            </div>

                            {/* Company Website */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Company Website <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    name="companyWebsite"
                                    value={formData.companyWebsite}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors placeholder-gray-400"
                                    placeholder=""
                                />
                            </div>

                            {/* Company Size */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Company Size <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-gray-800 focus:outline-none focus:border-[#1a4d4d] transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">Please Select</option>
                                        {companySizes.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* I Advertise On */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700">
                                    I Advertise On <span className="text-red-500">*</span> <span className="text-gray-400 font-normal">(Select all applicable)</span>
                                </label>
                                <div className="space-y-3">
                                    {advertiseOptions.map(option => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="advertiseOn"
                                                    value={option}
                                                    checked={formData.advertiseOn.includes(option)}
                                                    onChange={handleChange}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded transition-all peer-checked:border-[#1a4d4d] peer-checked:bg-[#1a4d4d] group-hover:border-[#1a4d4d]/50">
                                                    <Check className="w-full h-full text-white p-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                                <Check className={`absolute inset-0 w-5 h-5 text-white p-0.5 transition-opacity ${formData.advertiseOn.includes(option) ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>
                                            <span className="text-gray-700 text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Agreement Checkbox */}
                            <div className="pt-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative mt-0.5">
                                        <input
                                            type="checkbox"
                                            name="agreeToMarketing"
                                            checked={formData.agreeToMarketing}
                                            onChange={handleChange}
                                            required
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded transition-all peer-checked:border-[#1a4d4d] peer-checked:bg-[#1a4d4d] group-hover:border-[#1a4d4d]/50">
                                        </div>
                                        <Check className={`absolute inset-0 w-5 h-5 text-white p-0.5 transition-opacity ${formData.agreeToMarketing ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                    <span className="text-gray-600 text-sm leading-relaxed">
                                        I agree to receive information, marketing communications and product updates. Unsubscribe at any time. <span className="text-red-500">*</span>
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 rounded-full font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    style={{ backgroundColor: '#1a4d4d' }}
                                >
                                    {status === 'sending' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : status === 'success' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Check className="w-5 h-5" />
                                            Submitted Successfully!
                                        </span>
                                    ) : status === 'error' ? (
                                        'Error. Please try again.'
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1a4d4d' }}>
                                <Mail size={20} className="text-white" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Email us</p>
                            <a href="mailto:core@brandturn.com" className="font-semibold hover:underline" style={{ color: '#1a4d4d' }}>core@brandturn.com</a>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1a4d4d' }}>
                                <Phone size={20} className="text-white" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Call us</p>
                            <a href="tel:+917295823923" className="font-semibold hover:underline" style={{ color: '#1a4d4d' }}>+91 7295823923</a>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#1a4d4d' }}>
                                <MapPin size={20} className="text-white" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Visit us</p>
                            <p className="font-semibold" style={{ color: '#1a4d4d' }}>Mumbai, India</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default Contact;
