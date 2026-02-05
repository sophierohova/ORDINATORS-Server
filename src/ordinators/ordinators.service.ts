import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordinator } from './entities/ordinators.entity';
import { University } from './entities/university.entity';
import { CurrentControl } from './entities/current_control.entity';
import { Money } from './entities/money.entity';
import { Session } from './entities/session.entity';
import { Vacation } from './entities/vacation.entity';
import { EducationInfo } from './entities/education_info.entity';
import { CreateOrdinatorDto } from './dto/create-ordinator.dto';
import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

@Injectable()
export class OrdinatorsService {
  constructor(
    @InjectRepository(Ordinator)
    private ordinatorsRepository: Repository<Ordinator>,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
    @InjectRepository(CurrentControl)
    private currentControlRepository: Repository<CurrentControl>,
    @InjectRepository(Money)
    private moneyRepository: Repository<Money>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Vacation)
    private vacationRepository: Repository<Vacation>,
    @InjectRepository(EducationInfo)
    private educationInfoRepository: Repository<EducationInfo>,
  ) {}

  async create(createOrdinatorDto: CreateOrdinatorDto) {
    // Создаем связанные записи ПЕРВЫМИ
    let university: University | null = null;
    let currentControl: CurrentControl | null = null;
    let money: Money | null = null;
    let session: Session | null = null;
    let vacation: Vacation | null = null;
    let educationInfo: EducationInfo | null = null;

    // 1. Создаем University (если есть данные)
    if (createOrdinatorDto.universityName) {
      university = this.universityRepository.create({
        name: createOrdinatorDto.universityName,
        graduationYear: createOrdinatorDto.graduationYear,
        department: createOrdinatorDto.department,
        specialtyProfile: createOrdinatorDto.specialtyProfile,
        specialty: createOrdinatorDto.specialty,
        preparationForm: createOrdinatorDto.preparationForm,
      });
      university = await this.universityRepository.save(university);
    }

    // 2. Создаем CurrentControl (если есть данные)
    if (createOrdinatorDto.scores) {
      currentControl = this.currentControlRepository.create({
        scores: createOrdinatorDto.scores,
      });
      currentControl = await this.currentControlRepository.save(currentControl);
    }

    // 3. Создаем Money (если есть данные)
    if (createOrdinatorDto.allowanceStartDate) {
      money = this.moneyRepository.create({
        allowanceStartDate: createOrdinatorDto.allowanceStartDate,
        allowanceEndDate: createOrdinatorDto.allowanceEndDate,
      });
      money = await this.moneyRepository.save(money);
    }

    // 4. Создаем Session (если есть данные)
    if (createOrdinatorDto.sessionStart) {
      session = this.sessionRepository.create({
        sessionStart: createOrdinatorDto.sessionStart,
        sessionEnd: createOrdinatorDto.sessionEnd,
      });
      session = await this.sessionRepository.save(session);
    }

    // 5. Создаем Vacation (если есть данные)
    if (createOrdinatorDto.socialLeave) {
      vacation = this.vacationRepository.create({
        vacationStart: new Date(),
        vacationEnd: new Date(), // Можно настроить логику дат
      });
      vacation = await this.vacationRepository.save(vacation);
    }

    // 6. Создаем EducationInfo (если нужно)
    educationInfo = this.educationInfoRepository.create({});
    educationInfo = await this.educationInfoRepository.save(educationInfo);

    // 7. Теперь создаем Ordinator и связываем с созданными записями
    const ordinatorData: Partial<Ordinator> = {
      fio: createOrdinatorDto.fio,
      fioEn: createOrdinatorDto.fioEn,
      birthYear: createOrdinatorDto.birthYear,
      gender: createOrdinatorDto.gender,
      country: createOrdinatorDto.country,
      enrollmentDate: createOrdinatorDto.enrollmentDate,
      dismissalDate: createOrdinatorDto.dismissalDate,
      dismissalReason: createOrdinatorDto.dismissalReason,
      socialLeave: createOrdinatorDto.socialLeave,
      socialLeaveDuration: createOrdinatorDto.socialLeaveDuration,
      mobilePhone: createOrdinatorDto.mobilePhone,
      identityDocument: createOrdinatorDto.identityDocument,
      documentNumber: createOrdinatorDto.documentNumber,
      residenceAddress: createOrdinatorDto.residenceAddress,
      registrationExpiry: createOrdinatorDto.registrationExpiry,
      enrollmentOrder: createOrdinatorDto.enrollmentOrder,
      dismissalOrder: createOrdinatorDto.dismissalOrder,
      contractInfo: createOrdinatorDto.contractInfo,
      medicalCertificate: createOrdinatorDto.medicalCertificate,
      login: createOrdinatorDto.login,
      password: createOrdinatorDto.password,
      supervisorId: createOrdinatorDto.supervisorId,
      rivshCertificate: createOrdinatorDto.rivshCertificate,
      entryByInvitation: createOrdinatorDto.entryByInvitation,
      distributionInfo: createOrdinatorDto.distributionInfo,
      university: university || undefined,
      currentControl: currentControl || undefined,
      money: money || undefined,
      session: session || undefined,
      vacation: vacation || undefined,
      educationInfo: educationInfo || undefined,
    };

    const ordinator = this.ordinatorsRepository.create(ordinatorData);
    const savedOrdinator = await this.ordinatorsRepository.save(ordinator);

    return this.findOne(savedOrdinator.id);
  }

  async findAll() {
    try {
      return await this.ordinatorsRepository.find({
        relations: [
          'university',
          'currentControl',
          'money',
          'session',
          'vacation',
          'educationInfo'
        ],
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      return [];
    }
  }

  async findOne(id: number) {
    const ordinator = await this.ordinatorsRepository.findOne({
      where: { id },
      relations: [
        'university',
        'currentControl',
        'money',
        'session',
        'vacation',
        'educationInfo'
      ],
    });

    if (!ordinator) {
      throw new NotFoundException(`Ordinator with ID ${id} not found`);
    }

    return ordinator;
  }

  async update(id: number, updateOrdinatorDto: UpdateOrdinatorDto) {
    const ordinator = await this.findOne(id);

    // Обновляем основные поля ординатора
    Object.assign(ordinator, updateOrdinatorDto);

    // Обновляем связанные записи если нужно
    if (ordinator.university && (updateOrdinatorDto.universityName || updateOrdinatorDto.graduationYear)) {
      Object.assign(ordinator.university, {
        name: updateOrdinatorDto.universityName || ordinator.university.name,
        graduationYear: updateOrdinatorDto.graduationYear || ordinator.university.graduationYear,
        department: updateOrdinatorDto.department || ordinator.university.department,
        specialtyProfile: updateOrdinatorDto.specialtyProfile || ordinator.university.specialtyProfile,
        specialty: updateOrdinatorDto.specialty || ordinator.university.specialty,
        preparationForm: updateOrdinatorDto.preparationForm || ordinator.university.preparationForm,
      });
    }

    if (ordinator.currentControl && updateOrdinatorDto.scores) {
      Object.assign(ordinator.currentControl, {
        scores: updateOrdinatorDto.scores,
      });
    }

    if (ordinator.money && (updateOrdinatorDto.allowanceStartDate || updateOrdinatorDto.allowanceEndDate)) {
      Object.assign(ordinator.money, {
        allowanceStartDate: updateOrdinatorDto.allowanceStartDate || ordinator.money.allowanceStartDate,
        allowanceEndDate: updateOrdinatorDto.allowanceEndDate || ordinator.money.allowanceEndDate,
      });
    }

    if (ordinator.session && (updateOrdinatorDto.sessionStart || updateOrdinatorDto.sessionEnd)) {
      Object.assign(ordinator.session, {
        sessionStart: updateOrdinatorDto.sessionStart || ordinator.session.sessionStart,
        sessionEnd: updateOrdinatorDto.sessionEnd || ordinator.session.sessionEnd,
      });
    }

    await this.ordinatorsRepository.save(ordinator);

    return this.findOne(id);
  }

  async remove(id: number) {
    const ordinator = await this.findOne(id);

    // Каскадное удаление - связанные записи удалятся автоматически из-за cascade: true
    await this.ordinatorsRepository.remove(ordinator);

    return { message: `Ordinator with ID ${id} deleted successfully` };
  }
}