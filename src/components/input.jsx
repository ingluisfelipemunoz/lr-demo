export default Input() {
    return (<div>
        <label htmlFor="oficina" className="block text-sm font-medium text-gray-700">Oficina</label>
        <input type="text" name="oficina" value={formData.oficina} onChange={handleChange} className="input" />
    </div>);
} 