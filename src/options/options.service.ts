import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class OptionsService {
  private readonly logger = new Logger(OptionsService.name);
  private readonly optionsPath = path.join(process.cwd(), 'data', 'select-options.json');
  private readonly backupPath = path.join(process.cwd(), 'data', 'select-options.backup.json');

  private readonly defaultOptions = {
    gender: ['М', 'Ж'],
    dismissalReason: [
      'по окончанию срока подготовки',
      'за неуплату подготовки',
      'по собственному желанию',
      'отсутствие на занятиях',
      'иное'
    ],
    socialLeave: [
      'по беременности и родам',
      'по уходу за ребёнком',
      'мед показаниям',
      'служба в армии'
    ],
    university: ['БГМУ', 'ВГМУ', 'ГрГМУ', 'ГомГМУ', 'другое'],
    preparationForm: ['заочная', 'очная', 'платно', 'за счёт бюджета'],
    identityDocument: ['паспорт', 'вид на жительство', 'паспорт ИГ', 'иное'],
    residence: ['общежитие', 'квартира'],
    medicalCertificate: ['есть', 'нет'],
    rivshCertificate: ['да', 'нет'],
    entryByInvitation: ['да', 'нет'],
    country: [
        'Туркменистан',
        'Грузия',
        'Ливан',
        'Российская Федерация',
        'Иран',
        'Марокко',
        'Таджикистан',
        'Шри-Ланка',
        'Азербайджан',
        'Узбекистан',
        'Иордания',
        'Сирия',
        'Ирак',
        'Китай',
        'Ливия',
        'Казахстан',
        'Йемен',
        'Индия',
        'Украина',
        'Гана',
        'Израиль',
        'Нигерия',
        'Пакистан',
        'Египет',
        'Палестина',
        'Судан',
        'Эстония',
        'Армения',
        'Бразилия',
        'Литва',
        'Словакия',
        'США',
        'Турция',
        'Эквадор',
        'Вьетнам',
        'Кыргызстан',
        'Сомали',
        'Молдова',
        'Португалия',
        'Германия',
        'Тунис',
        'Латвия'
    ],
    departments: [
        "1-я кафедра детских болезней",
        "2-я кафедра детских болезней",
        "Кафедра акушерства и гинекологии",
        "Кафедра акушерства и гинекологии с курсом повышения квалификации и переподготовки",
        "Кафедра анестезиологии и реаниматологии с курсом повышения квалификации и переподготовки",
        "Кафедра внутренних болезней, гастроэнтерологии и нутрициологии с курсом повышения квалификации и переподготовки",
        "Кафедра внутренних болезней, кардиологии, ревматологии с курсом повышения квалификации и переподготовки",
        "Кафедра глазных болезней",
        "Кафедра дерматовенерологии и косметологии с курсом повышения квалификации и переподготовки",
        "Кафедра детских инфекционных болезней с курсом повышения квалификации и переподготовки",
        "Кафедра детской анестезиологии и реаниматологии",
        "Кафедра детской неврологии",
        "Кафедра детской онкологии, гематологии и иммунологии",
        "Кафедра детской хирургии с курсом повышения квалификации и переподготовки",
        "Кафедра детской эндокринологии, клинической генетики и иммунологии с курсом повышения квалификации и переподготовки",
        "Кафедра инфекционных болезней с курсом повышения квалификации и переподготовки",
        "Кафедра кардиологии и внутренних болезней",
        "Кафедра кардиохирургии",
        "Кафедра клинической гематологии и трансфузиологии",
        "Кафедра клинической микробиологии, лабораторной диагностики и эпидемиологии",
        "Кафедра клинической фармакологии",
        "Кафедра клинической фармакологии и фармакотерапии",
        "Кафедра клинической эндокринологии",
        "Кафедра консервативной стоматологии",
        "Кафедра лучевой диагностики",
        "Кафедра лучевой диагностики и лучевой терапии",
        "Кафедра медицинской реабилитации и спортивной медицины с курсом повышения квалификации и переподготовки",
        "Кафедра медицинской экспертизы и оценки качества медицинской помощи",
        "Кафедра неврологии и нейрохирургии",
        "Кафедра нервных и нейрохирургических болезней",
        "Кафедра общей врачебной практики с курсом гериатрии и паллиативной медицины",
        "Кафедра общей хирургии",
        "Кафедра онкологии с курсом повышения квалификации и переподготовки",
        "Кафедра ортопедической стоматологии и ортодонтии",
        "Кафедра ортопедической стоматологии с курсом детской стоматологии",
        "Кафедра оториноларингологии с курсом повышения квалификации и переподготовки",
        "Кафедра офтальмологии",
        "Кафедра патологической анатомии и судебной медицины с курсом повышения квалификации и переподготовки",
        "Кафедра педиатрии",
        "Кафедра периодонтологии",
        "Кафедра пластической хирургии и комбустиологии",
        "Кафедра поликлинической терапии",
        "Кафедра пропедевтики внутренних болезней",
        "Кафедра пропедевтики детских болезней",
        "Кафедра психиатрии, наркологии, психотерапии и медицинской психологии с курсом повышения квалификации и переподготовки",
        "Кафедра пульмонологии, фтизиатрии, аллергологии и профпатологии с курсом повышения квалификации и переподготовки",
        "Кафедра репродуктивного здоровья, перинатологии и медицинской генетики",
        "Кафедра рефлексотерапии",
        "Кафедра скорой медицинской помощи и медицины катастроф",
        "Кафедра стоматологии детского возраста",
        "Кафедра стоматологической пропедевтики и материаловедения",
        "Кафедра терапевтической стоматологии",
        "Кафедра терапии",
        "Кафедра травматологии и ортопедии с курсом повышения квалификации и переподготовки",
        "Кафедра ультразвуковой диагностики",
        "Кафедра урологии и нефрологии с курсом повышения квалификации и переподготовки",
        "Кафедра хирургии и трансплантологии с курсом повышения квалификации и переподготовки",
        "Кафедра хирургии и эндоскопии",
        "Кафедра хирургических болезней с курсом повышения квалификации и переподготовки",
        "Кафедра хирургической стоматологии",
        "Кафедра челюстно-лицевой хирургии и пластической хирургии лица с курсом повышения квалификации и переподготовки",
        "Кафедра эндодонтии",
        "Кафедра эндокринологии"
    ],
    specialtyProfiles: [
        "Акушерство и гинекология",
        "Аллергология и иммунология",
        "Анестезиология и реаниматология",
        "Анестезиология-реаниматология детская",
        "Гастроэнтерология",
        "Гематология",
        "Дерматовенерология",
        "Дерматовенерология и косметология",
        "Детская кардиоревматология",
        "Детская неврология",
        "Детская онкогематология",
        "Детская хирургия",
        "Инфекционные болезни",
        "Кардиология",
        "Кардиохирургия",
        "Клиническая лабораторная диагностика",
        "Клиническая фармакология",
        "Комбустиология",
        "Лучевая диагностика",
        "Мануальная терапия",
        "Медицинская экспертиза",
        "Неврология",
        "Нейрохирургия",
        "Неонатология",
        "Нефрология",
        "Общая врачебная практика",
        "Онкология",
        "Онкохирургия",
        "Ортодонтия",
        "Оториноларингология",
        "Оториноларингология специальная",
        "Офтальмология",
        "Патологическая анатомия",
        "Педиатрия",
        "Пластическая хирургия",
        "Проктология",
        "Профпатология",
        "Психиатрия и наркология",
        "Психиатрия-наркология и детская психиатрия",
        "Психотерапия",
        "Пульмонология",
        "Радиология",
        "Реабилитология",
        "Ревматология",
        "Рентгено-эндоваскулярная хирургия",
        "Рефлексотерапия",
        "Скорая медицинская помощь",
        "Сосудистая хирургия",
        "Спортивная медицина",
        "Стоматология",
        "Стоматология детская",
        "Стоматология ортопедическая",
        "Стоматология терапевтическая",
        "Стоматология терапевтическая и периодонтология",
        "Стоматология хирургическая",
        "Терапия",
        "Токсикология",
        "Торакальная хирургия",
        "Травматология и ортопедия",
        "Трансплантология",
        "Ультразвуковая диагностика",
        "Урология",
        "Физиотерапия",
        "Физическая и реабилитационная медицина",
        "Фтизиатрия",
        "Функциональная диагностика",
        "Хирургия",
        "Челюстно-лицевая хирургия",
        "Эндокринология",
        "Эндокринология взрослая и детская",
        "Эндоскопия"
    ]
  };

  async onModuleInit() {
    await this.ensureFileExists();
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.optionsPath);
      
      const content = await fs.readFile(this.optionsPath, 'utf-8');
      if (!content || content.trim() === '') {
        this.logger.warn('Options file is empty, creating default file');
        await this.writeOptions(this.defaultOptions);
        return;
      }
      
      try {
        JSON.parse(content);
      } catch {
        this.logger.warn('Options file contains invalid JSON, recreating with defaults');
        await this.writeOptions(this.defaultOptions);
      }
    } catch {
      this.logger.log('Options file not found, creating with defaults');
      await this.writeOptions(this.defaultOptions);
    }
  }

  private async readOptions(): Promise<any> {
    try {
      const content = await fs.readFile(this.optionsPath, 'utf-8');
      
      if (!content || content.trim() === '') {
        this.logger.warn('Options file is empty, using defaults');
        return this.defaultOptions;
      }

      try {
        return JSON.parse(content);
      } catch (parseError) {
        this.logger.error('Invalid JSON in options file:', parseError);
        
        try {
          const backupContent = await fs.readFile(this.backupPath, 'utf-8');
          if (backupContent && backupContent.trim() !== '') {
            const backupData = JSON.parse(backupContent);
            this.logger.log('Restored from backup');
            return backupData;
          }
        } catch {
          this.logger.log('Backup not available or invalid');
        }
        
        this.logger.log('Using default options');
        return this.defaultOptions;
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.warn('Options file not found, using defaults');
        return this.defaultOptions;
      }
      
      this.logger.error('Error reading options file:', error);
      return this.defaultOptions;
    }
  }

  private async writeOptions(options: any): Promise<void> {
    try {
      try {
        const currentData = await fs.readFile(this.optionsPath, 'utf-8').catch(() => null);
        if (currentData) {
          await fs.writeFile(this.backupPath, currentData);
        }
      } catch {
      }

      const dataToWrite = options && typeof options === 'object' ? options : this.defaultOptions;
      
      await fs.writeFile(
        this.optionsPath, 
        JSON.stringify(dataToWrite, null, 2),
        'utf-8'
      );
      
      this.logger.log('Options saved successfully');
    } catch (error) {
      this.logger.error('Error writing options file:', error);
      throw new BadRequestException('Не удалось сохранить опции');
    }
  }

  async findAll(): Promise<any> {
    return this.readOptions();
  }

  async saveAll(options: any): Promise<any> {
    await this.writeOptions(options);
    return options;
  }

  async addOption(field: string, value: string): Promise<any> {
    if (!value || !value.trim()) {
      throw new BadRequestException('Значение не может быть пустым');
    }

    const options = await this.readOptions();
    
    if (!options[field]) {
      options[field] = [];
    }
    
    if (!options[field].includes(value.trim())) {
      options[field].push(value.trim());
      await this.writeOptions(options);
    }
    
    return options;
  }

  async deleteOption(field: string, value: string): Promise<any> {
    const options = await this.readOptions();
    
    if (!options[field]) {
      return options;
    }
    
    options[field] = options[field].filter(v => v !== value);
    await this.writeOptions(options);
    
    return options;
  }

  async resetToDefault(): Promise<any> {
    await this.writeOptions(this.defaultOptions);
    return this.defaultOptions;
  }
}