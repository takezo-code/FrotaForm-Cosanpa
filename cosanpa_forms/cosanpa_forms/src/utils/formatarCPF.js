export default function formatarCPF(cpf) {
  let nums = cpf.replace(/\D/g, '').slice(0, 11);
  nums = nums.replace(/(\d{3})(\d)/, '$1.$2');
  nums = nums.replace(/(\d{3})(\d)/, '$1.$2');
  nums = nums.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return nums;
}
