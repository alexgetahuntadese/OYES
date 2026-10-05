-- O-YES EMIS Database Schema
-- PostgreSQL 15+ with PostGIS extension

-- Core Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. TENANCY & MASTER DATA
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(3) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    default_currency VARCHAR(3) DEFAULT 'ETB',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE offices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES countries(id),
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    office_type VARCHAR(50) CHECK (office_type IN ('GLOBAL_HQ', 'REGIONAL', 'COUNTRY', 'FIELD')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 2. USERS & RBAC
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    office_id UUID REFERENCES offices(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    user_type VARCHAR(50) CHECK (user_type IN ('SUPER_ADMIN', 'HQ_STAFF', 'FIELD_OFFICER', 'PARTNER', 'VOLUNTEER')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 3. PROJECT & PROGRAMME MANAGEMENT
CREATE TABLE programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES countries(id),
    title VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    thematic_area VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    programme_id UUID REFERENCES programmes(id),
    office_id UUID REFERENCES offices(id),
    title VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'CLOSED')),
    total_budget NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 4. BENEFICIARY MANAGEMENT (HIGH SENSITIVITY)
CREATE TABLE beneficiaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    office_id UUID REFERENCES offices(id),
    beneficiary_code VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    vulnerability_status VARCHAR(100),
    location GEOMETRY(Point, 4326),
    is_encrypted BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 5. VOLUNTEER MANAGEMENT (VMIS)
CREATE TABLE volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_code VARCHAR(50) UNIQUE NOT NULL,
    skills TEXT[],
    qualifications TEXT[],
    availability_status VARCHAR(50) DEFAULT 'AVAILABLE' CHECK (availability_status IN ('AVAILABLE', 'UNAVAILABLE', 'DEPLOYED')),
    gps_home_location GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 6. AUDIT TRAIL LOGGING
CREATE TABLE system_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 7. SYNC TRANSACTIONS (Offline-First)
CREATE TABLE processed_sync_transactions (
    client_tx_id VARCHAR(100) PRIMARY KEY,
    device_id UUID NOT NULL,
    user_id UUID NOT NULL,
    entity VARCHAR(100) NOT NULL,
    operation VARCHAR(20) CHECK (operation IN ('CREATE', 'UPDATE', 'DELETE')),
    payload JSONB NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    client_timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_offices_country_id ON offices(country_id);
CREATE INDEX idx_offices_office_type ON offices(office_type);
CREATE INDEX idx_users_office_id ON users(office_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_programmes_country_id ON programmes(country_id);
CREATE INDEX idx_programmes_thematic_area ON programmes(thematic_area);
CREATE INDEX idx_projects_programme_id ON projects(programme_id);
CREATE INDEX idx_projects_office_id ON projects(office_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_beneficiaries_office_id ON beneficiaries(office_id);
CREATE INDEX idx_beneficiaries_beneficiary_code ON beneficiaries(beneficiary_code);
CREATE INDEX idx_beneficiaries_location ON beneficiaries USING GIST(location);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_volunteers_availability_status ON volunteers(availability_status);
CREATE INDEX idx_system_audit_logs_user_id ON system_audit_logs(user_id);
CREATE INDEX idx_system_audit_logs_entity_name ON system_audit_logs(entity_name);
CREATE INDEX idx_system_audit_logs_created_at ON system_audit_logs(created_at);
CREATE INDEX idx_processed_sync_transactions_device_id ON processed_sync_transactions(device_id);
CREATE INDEX idx_processed_sync_transactions_user_id ON processed_sync_transactions(user_id);
