import { Injectable } from '@nestjs/common';

@Injectable()
export class AffiliateService {
  /**
   * Lấy danh sách các đối tác dịch vụ xanh (khách sạn di sản, xe đạp sinh thái, nhà rường ẩm thực)
   */
  async getPartners() {
    return [
      {
        id: 'partner-bike-01',
        partnerName: 'Hue Green Eco-Bicycle (Xe đạp xanh cố đô)',
        serviceType: 'TRANSPORT_ECO',
        discountCode: 'HUEGO_GREEN_20',
        discountPercent: 20,
        bookingUrl: 'https://partner.huego.vn/booking/eco-bike?ref=huego_app',
        description: 'Thuê xe đạp công cộng tại các trạm bờ sông Hương, giảm 20% khi xuất trình điểm Green Points.',
      },
      {
        id: 'partner-hotel-02',
        partnerName: 'Resort Làng Hành Hương (Pilgrimage Village)',
        serviceType: 'HOTEL',
        discountCode: 'HUEGO_PILGRIM',
        discountPercent: 15,
        bookingUrl: 'https://partner.huego.vn/booking/pilgrimage?ref=huego_app',
        description: 'Khu nghỉ dưỡng đậm chất làng quê mộc mạc và kiến trúc nhà rường xứ Huế.',
      },
      {
        id: 'partner-tea-03',
        partnerName: 'Trà Cung Đình Đức Phượng',
        serviceType: 'FOOD_TEA',
        discountCode: 'HUEGO_TEA10',
        discountPercent: 10,
        bookingUrl: 'https://partner.huego.vn/booking/tea-duc-phuong?ref=huego_app',
        description: 'Thưởng thức trà thảo mộc cung đình 26 vị thảo dược quý tiến vua.',
      },
    ];
  }

  /**
   * Theo dõi lượt click link affiliate của du khách
   */
  async trackAffiliateClick(partnerId: string, userId: string) {
    return {
      tracked: true,
      partnerId,
      userId,
      timestamp: new Date().toISOString(),
      redirectUrl: `https://partner.huego.vn/redirect?partnerId=${partnerId}&refUserId=${userId}`,
    };
  }
}
