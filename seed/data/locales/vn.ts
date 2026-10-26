import type { Name, Surname } from '../locale'

// Vietnamese names for tenants abroad: the seed lets no homes in Vietnam, whose dong amounts would not fit the
// money columns.
export const vn: { given: { f: readonly Name[]; m: readonly Name[] }; surnames: readonly Surname[] } = {
  given: { f: ['Thị Hương', 'Ngọc Ánh', 'Thu Trang', 'Phương Thảo', 'Bảo Ngọc'], m: ['Văn Đức', 'Minh Tuấn', 'Quốc Bảo', 'Hữu Nghĩa', 'Đức Thắng'] },
  surnames: ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Đặng', 'Vũ', 'Bùi'],
}
